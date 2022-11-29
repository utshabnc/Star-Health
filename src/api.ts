import { useState, useEffect } from 'react';
import { DoctorParams, DoctorResponse } from '../functions/src/doctor';
import { StateParams, StateResponse } from '../functions/src/state';
import {
  ManufacturerParams,
  ManufacturerResponse,
} from '../functions/src/manufacturer';
import { AddReviewParams } from '../functions/src/addReview';
import { SearchParams, SearchResponse } from '../functions/src/search';
import { AllStatesParams, AllStatesResponse } from '../functions/src/allStates';
import { AllManufacturersParams, AllManufacturersResponse } from '../functions/src/allManufacturers';
import { useUser } from './hooks';

// Set to true to use firebase emulator
const dev = false;
const baseUrl = dev ? 'http://localhost:5000' : 'https://starhealth-io.web.app';

const useLazySearchQuery = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<SearchResponse>();

  const query = async ({ search }: Partial<SearchParams>) => {
    const res = await fetch(baseUrl + '/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search }),
    }).catch((err) => {
      setError(err);
    });

    if (!res) {
      setLoading(false);
      return;
    }

    const responseData: SearchResponse = await res.json();

    setData(responseData);
    setLoading(false);
  };

  return { loading, data, error, query };
};

const createUseQuery =
  <P extends Record<string, any>, R>(apiPath: string) =>
  (
    params: Partial<P>,
    { skip = false }: { skip?: boolean; lazy?: boolean } = {}
  ) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const [data, setData] = useState<R>();

    const fetchData = async () => {
      const res = await fetch(baseUrl + `/api/${apiPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).catch((err) => {
        setError(err);
      });

      if (!res) {
        setLoading(false);
        return;
      }

      const data = await res.json();

      setData(data);
      setLoading(false);
    };

    useEffect(() => {
      if (skip) return;
      setLoading(true);
      fetchData();
    }, [skip, JSON.stringify(params)]);

    return { loading, data, error, refetch: fetchData };
  };

const useSearchQuery = createUseQuery<SearchParams, SearchResponse>('search');
const useDoctorQuery = createUseQuery<DoctorParams, DoctorResponse>('doctor');
// const useDrugQuery = createUseQuery<DrugParams, DrugResponse>('drug');
const useManufacturerQuery = createUseQuery<
  ManufacturerParams,
  ManufacturerResponse
>('manufacturer');
const useStateQuery = createUseQuery<StateParams, StateResponse>('state');
const useAllStatesQuery = createUseQuery<AllStatesParams, AllStatesResponse>(
  'allStates'
);
const useAllManufacturersQuery = createUseQuery<AllManufacturersParams, AllManufacturersResponse>(
  'allManufacturers'
);

const useAddReviewMutation = () => {
  const [user] = useUser();

  const addReviewMutation = async (params: AddReviewParams) => {
    const userToken = await user?.getIdToken();

    return fetch(baseUrl + '/api/addReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(params),
    });
  };

  return addReviewMutation;
};

export {
  useDoctorQuery,
  useManufacturerQuery,
  useStateQuery,
  useAllStatesQuery,
	useAllManufacturersQuery,
  useSearchQuery,
  useLazySearchQuery,
  useAddReviewMutation,
};
