import { geoAlbers } from "d3-geo"
import { scaleQuantile } from 'd3-scale';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as topojson from 'topojson-client';
import turfBbox from '@turf/bbox';
import turfCentroid from '@turf/centroid';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from 'react-simple-maps';
import { StateResponse } from '../../../functions/src/state';
import { colorGradient, formatMoney } from '../../utils';
import countyData from './gz_2010_us_050_00_20m.json';
import ReactTooltip from 'react-tooltip';

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

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/counties-10m.json';

type Props = {
  state: String;
  data: StateResponse['counties'];
  width: number;
  height: number;
  setTooltipContent?: (content: string) => void;
};

const colorRange = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10].map(colorGradient).reverse();

const CountyHeatmap = (props: Props) => {
  const [tooltipContent, setTooltipContent] = useState('');
  console.log(tooltipContent);
  return (
    <>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <Map {...{ ...props, setTooltipContent }} />
    </>
  );
};

const Map = ({ state, data, width, height, setTooltipContent }: Props) => {
  const colorScale = scaleQuantile<string>()
    // .domain(data.map((d) => d.totalAmount / d.population ?? 1))
    .domain(data.map((d) => d.totalAmount))
    .range(colorRange);

  // const [geography, setGeography] = useState();

  // useEffect(() => {
  //   (async function fetchCountyData() {
  //     const res = await fetch(geoUrl);
  //     const json = (await res.json()) as TopoJSON.Topology<any>;

  //     const countyFips = data.map((d) => d.fips);
  //     const geometries = json.objects.counties.geometries.filter((geo: any) =>
  //       countyFips.includes(geo.id)
  //     );

  //     const counties = {
  //       type: 'GeometryCollection',
  //       geometries,
  //     };

  //     console.log({ geometries });
  //     // const bbox = topojson.bbox({
  //     //   arcs: [],
  //     //   objects: { counties },
  //     // } as any);
  //     const mergedGeoJson = topojson.merge(json, geometries);
  //     const merged = topojson.mergeArcs(json, geometries);
  //     const bbox = turfBbox(mergedGeoJson);
  //     console.log({ merged });
  //     //   const bbox = turfBbox(geometries);
  //     //
  //     const geo = {
  //       ...json,
  //       objects: {
  //         counties,
  //       },
  //       // arcs: merged.arcs,
  //       bbox,
  //     };
  //     setGeography(geo as any);
  //   })();
  // }, []);

  // if (!geography) return null;

  const stateId = allStates.find((s) => s.id === state)?.val ?? '';

  const stateCounties = countyData.features.filter(
    (d) => d.properties.STATE === stateId
  );

  const geography = {
    type: 'FeatureCollection',
    features: stateCounties,
  };
  const bounds = turfBbox(geography);

  const centroid = turfCentroid(geography as any);
  
  const proj = geoAlbers()
    .rotate([-centroid.geometry.coordinates[0], 0, 0])
    .fitSize([width, height], geography as any)

  return (
    <div style={{ height, width }} data-tip=''>
      <ComposableMap
        // pointerEvents={'none'}
        width={width}
        height={height}
        projection={proj as any}
      >
    
          <Geographies
          geography={geography}
            // geography={
            //   'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/AL-01-alabama-counties.json'
            // }
          >
            {({ geographies }) => (
              <>
                {geographies.map((geo) => {
                  const countyFips =
                    geo.properties.STATE + geo.properties.COUNTY;
                  const countyVal = data.find((d) => d.fips === countyFips);

                  const totalAmount = countyVal?.totalAmount ?? 0;
                  // const paymentPerCapita =
                  //   (countyVal?.totalAmount ?? 0) /
                  //   (countyVal?.population ?? 0);
                  const fillColor = colorScale(totalAmount) ?? '#DDD';

                  return (
                    <Geography
                      cursor='pointer'
                      onMouseEnter={() => {
                        if (countyVal == null) return;

                        setTooltipContent?.(
                          `${countyVal?.name} - ${formatMoney(totalAmount)}`
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent?.('');
                      }}
                      //   onClick={() => navigate(`/state/${stateId}`)}
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
    </div>
  );
};

export default CountyHeatmap;
