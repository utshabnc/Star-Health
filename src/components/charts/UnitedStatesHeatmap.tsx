import { geoAlbers, geoCentroid } from 'd3-geo';
import { scaleQuantile } from 'd3-scale';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from 'react-simple-maps';
import { colorGradient } from '../../utils';

const allStates = [
  { id: 'AL', val: '01' },
  { id: 'AK', val: '02' },
  { id: 'AS', val: '60' },
  { id: 'AZ', val: '04' },
  { id: 'AR', val: '05' },
  { id: 'CA', val: '06' },
  { id: 'CO', val: '08' },
  { id: 'CT', val: '09' },
  { id: 'DE', val: '10' },
  { id: 'DC', val: '11' },
  { id: 'FL', val: '12' },
  { id: 'FM', val: '64' },
  { id: 'GA', val: '13' },
  { id: 'GU', val: '66' },
  { id: 'HI', val: '15' },
  { id: 'ID', val: '16' },
  { id: 'IL', val: '17' },
  { id: 'IN', val: '18' },
  { id: 'IA', val: '19' },
  { id: 'KS', val: '20' },
  { id: 'KY', val: '21' },
  { id: 'LA', val: '22' },
  { id: 'ME', val: '23' },
  { id: 'MH', val: '68' },
  { id: 'MD', val: '24' },
  { id: 'MA', val: '25' },
  { id: 'MI', val: '26' },
  { id: 'MN', val: '27' },
  { id: 'MS', val: '28' },
  { id: 'MO', val: '29' },
  { id: 'MT', val: '30' },
  { id: 'NE', val: '31' },
  { id: 'NV', val: '32' },
  { id: 'NH', val: '33' },
  { id: 'NJ', val: '34' },
  { id: 'NM', val: '35' },
  { id: 'NY', val: '36' },
  { id: 'NC', val: '37' },
  { id: 'ND', val: '38' },
  { id: 'MP', val: '69' },
  { id: 'OH', val: '39' },
  { id: 'OK', val: '40' },
  { id: 'OR', val: '41' },
  { id: 'PW', val: '70' },
  { id: 'PA', val: '42' },
  { id: 'PR', val: '72' },
  { id: 'RI', val: '44' },
  { id: 'SC', val: '45' },
  { id: 'SD', val: '46' },
  { id: 'TN', val: '47' },
  { id: 'TX', val: '48' },
  { id: 'UM', val: '74' },
  { id: 'UT', val: '49' },
  { id: 'VT', val: '50' },
  { id: 'VA', val: '51' },
  { id: 'VI', val: '78' },
  { id: 'WA', val: '53' },
  { id: 'WV', val: '54' },
  { id: 'WI', val: '55' },
  { id: 'WY', val: '56' },
];

const populations: { [key: string]: number } = {
  AL: 4903185,
  AK: 731545,
  AS: 55312,
  AZ: 7278717,
  AR: 3017804,
  CA: 39512223,
  CO: 5758736,
  CT: 3565287,
  DE: 973764,
  DC: 705749,
  FM: 104929,
  FL: 21477737,
  GA: 10617423,
  GU: 167294,
  HI: 1415872,
  ID: 1787065,
  IL: 12671821,
  IN: 6732219,
  IA: 3155070,
  KS: 2913314,
  KY: 4467673,
  LA: 4648794,
  ME: 1344212,
  MH: 58791,
  MD: 6045680,
  MA: 6892503,
  MI: 9986857,
  MN: 5639632,
  MS: 2976149,
  MO: 6137428,
  MT: 1068778,
  NE: 1934408,
  NV: 3080156,
  NH: 1359711,
  NJ: 8882190,
  NM: 2096829,
  NY: 19453561,
  NC: 10488084,
  ND: 762062,
  MP: 51994,
  OH: 11689100,
  OK: 3956971,
  OR: 4217737,
  PW: 18008,
  PA: 12801989,
  PR: 3193694,
  RI: 1059361,
  SC: 5148714,
  SD: 884659,
  TN: 6829174,
  TX: 28995881,
  UT: 3205958,
  VT: 623989,
  VI: 104578,
  VA: 8535519,
  WA: 7614893,
  WV: 1792147,
  WI: 5822434,
  WY: 578759,
};

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const offsets: { [key: string]: [number, number] } = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

type Props = {
  data: {
    state: string;
    value: number;
  }[];
};

const colorRange = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10].map(colorGradient).reverse();

const UnitedStatesHeatmap = ({ data }: Props) => {
  const colorScale = scaleQuantile<string>()
    .domain(data.map((d) => d.value / populations[d.state] ?? 1))
    .range(colorRange);

  const navigate = useNavigate();

  // const proj = geoAlbers()
  // .rotate([0, 0, 0])
  // .fitSize([width, height], geography as any)

  return (
    <ComposableMap
      // style={{ marginTop: screen.width > 1000 ? -80 : -10 }}
      projection='geoAlbersUsa'
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const stateId = allStates.find((s) => s.val === geo.id)?.id ?? '';

              const paymentAmount =
                data.find((d) => d.state === stateId)?.value ?? 0;

              const fillColor =
                colorScale(paymentAmount / populations[stateId] ?? 0) ?? '#DDD';

              return (
                <Geography
                  cursor='pointer'
                  onClick={() => navigate(`/state/${stateId}`)}
                  key={geo.rsmKey}
                  stroke='#FFF'
                  geography={geo}
                  fill={fillColor}
                />
              );
            })}
            {/* {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + '-name'}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y='2' fontSize={14} textAnchor='middle'>
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        connectorProps={{}}
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline='middle'>
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })} */}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default UnitedStatesHeatmap;
