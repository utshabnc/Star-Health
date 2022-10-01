import { Prisma, PrismaClient } from '@prisma/client';
import _ from 'lodash';
import { getUser } from './auth';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// // @ts-ignore
// prisma.$on('query', (e) => {
//   // @ts-ignore
//   console.log('Params: ' + e.params);
//   // @ts-ignore
//   console.log('Duration: ' + e.duration + 'ms');
// });

const defaultDoctorSelect = Prisma.validator<Prisma.DoctorSelect>()({
  id: true,
  firstName: true,
  middleName: true,
  lastName: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  state: true,
  zipCode: true,
  specialty: true,
  reviews: true,
  payments: true,
  rank: true,
});

const defaultReviewSelect = Prisma.validator<Prisma.ReviewSelect>()({
  id: true,
  doctorId: true,
  rating: true,
  text: true,
  createdAt: true,
  createdBy: true,
});

const defaultManufacturerSelect = Prisma.validator<Prisma.ManufacturerSelect>()(
  {
    id: true,
    name: true,
    state: true,
    country: true,
    rank: true,
  }
);

const db = {
  search: async (search: string) => {
    const names = search.split(' ');

    let searchArgs: Prisma.DoctorWhereInput = {
      OR: [
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    };

    if (names.length === 2) {
      searchArgs = {
        AND: [
          {
            firstName: {
              startsWith: names[0],
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              startsWith: names[1],
              mode: 'insensitive',
            },
          },
        ],
      };
    } else if (names.length > 2) {
      searchArgs = {
        AND: [
          {
            firstName: {
              startsWith: names[0],
              mode: 'insensitive',
            },
          },
          {
            middleName: {
              startsWith: names[1],
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              startsWith: names[2],
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    const doctors = await prisma.doctor.findMany({
      where: searchArgs,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        city: true,
        state: true,
      },
      take: 10,
    });

    const manufacturers = await prisma.manufacturer.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: 10,
    });

    return { doctors, manufacturers };
  },
  doctor: async ({ id, year }: { id: string; year?: string }) => {
    const doctor = await prisma.doctor.findFirst({
      where: { id },
      select: defaultDoctorSelect,
    });

    const payments =
      doctor?.payments.filter((p) => !year || p.year === year) ?? [];

    const totalAmount = _.round(_.sum(payments.map((p) => p.amount)), 2);

    const topProducts = _(payments)
      .groupBy('productName')
      .map((pmts, productName) => ({
        productName,
        amount: _.round(_.sumBy(pmts, 'amount'), 2),
        type: payments.find((p) => p.productName === productName)?.productType,
        count: pmts.length,
      }))
      .value();

    const topManufacturers = _(payments)
      .groupBy('manufacturerName')
      .map((pmts, manufacturerName) => ({
        manufacturerName,
        amount: _.round(_.sumBy(pmts, 'amount'), 2),
        count: pmts.length,
      }))
      .value();

    const reviews = await Promise.all(
      doctor?.reviews?.map(async (review) => ({
        ...review,
        user: await getUser(review.createdBy).catch(() => {}),
      })) ?? []
    );

    return {
      ...doctor,
      payments,
      reviews,
      totalAmount,
      topProducts,
      topManufacturers,
    };
  },
  manufacturer: async ({ id, year }: { id: string; year?: string }) => {
    const manufacturer = await prisma.manufacturer.findFirst({
      where: { id },
      select: defaultManufacturerSelect,
    });

    const summary = await prisma.manufacturerSummary.findFirst({
      where: {
        manufacturerId: id,
        year: year ?? 'ALL',
      },
      select: {
        totalAmount: true,
      },
    });

    const topDoctors = await prisma.manufacturerDoctors.findMany({
      where: {
        manufacturerId: id,
        year: year ?? 'ALL',
      },
      select: {
        doctor: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
        totalAmount: true,
        transactionCount: true,
      },
    });

    const largestPayments = await prisma.manufacturerTopPayment.findMany({
      where: {
        manufacturerId: id,
        year: year ?? 'ALL',
      },
      select: {
        doctor: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
        amount: true,
      },
    });

    const topStates = await prisma.manufacturerState.findMany({
      where: {
        manufacturerId: id,
        year: year ?? 'ALL',
      },
      select: {
        state: true,
        totalAmount: true,
        transactionCount: true,
      },
    });

    const items = await prisma.manufacturerItems.findMany({
      where: {
        manufacturerId: id,
        year: year ?? 'ALL',
      },
    });

    return {
      ...manufacturer,
      totalAmount: summary?.totalAmount ?? 0,
      largestPayments,
      items,
      topDoctors,
      topStates,
    };
  },
  allStates: async ({ drugType }: { drugType?: string }) => {
    const states = await prisma.stateSummary.findMany({
      where: {
        year: 'ALL',
        drugType: drugType ?? 'ALL',
      },
      select: {
        stateId: true,
        totalAmount: true,
      },
    });

    return states;
  },

  state: async ({
    id,
    year,
    drugType,
  }: {
    id: string;
    year?: string;
    drugType?: string;
  }) => {
    const state = await prisma.state.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        rank: true,
      },
    });

    const summary = await prisma.stateSummary.findFirst({
      where: {
        stateId: id,
        drugType: drugType ?? 'ALL',
        year: year ?? 'ALL',
      },
    });

    const items = await prisma.stateItem.findMany({
      where: {
        stateId: id,
        drugType: drugType ?? 'ALL',
        year: year ?? 'ALL',
      },
      select: {
        manufacturer: {
          select: {
            id: true,
            name: true,
          },
        },
        productName: true,
        productType: true,
        totalAmount: true,
        transactionCount: true,
      },
      orderBy: {
        totalAmount: 'desc',
      },
      take: 1000,
    });

    const mostCommonItems = _.sortBy(items, 'transactionCount')
      .reverse()
      .slice(0, 10);
    const topItems = _.sortBy(items, 'totalAmount').reverse().slice(0, 10);

    const topManufacturers = await prisma.stateManufacturer.findMany({
      where: {
        stateId: id,
        drugType: drugType ?? 'ALL',
        year: year ?? 'ALL',
      },
      select: {
        manufacturer: {
          select: {
            id: true,
            name: true,
          },
        },
        totalAmount: true,
        transactionCount: true,
      },
    });

    const topDoctors = await prisma.stateDoctor.findMany({
      where: {
        stateId: id,
        drugType: drugType ?? 'ALL',
        year: year ?? 'ALL',
      },
      select: {
        doctor: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
        totalAmount: true,
        transactionCount: true,
      },
    });

    const counties = await prisma.stateCounty.findMany({
      where: {
        stateId: id,
        drugType: drugType ?? 'ALL',
        year: year ?? 'ALL',
      },
      select: {
        fips: true,
        name: true,
        totalAmount: true,
        population: true,
      },
    });

    return {
      ...state,
      totalAmount: summary?.totalAmount ?? 0,
      summaryRank: summary?.rank,
      mostCommonItems,
      topItems,
      topManufacturers,
      topDoctors,
      counties,
    };
  },
  addReview: async (input: Prisma.ReviewUncheckedCreateInput) => {
    const review = await prisma.review.create({
      data: input,
      select: defaultReviewSelect,
    });
    return review;
  },
};

export default db;
