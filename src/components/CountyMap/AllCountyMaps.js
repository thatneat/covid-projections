import React, { Fragment } from 'react';
import _ from 'lodash';
import { CountyMapInner } from './CountyMap';
import STATE_CENTERS from '../../enums/us_state_centers';
import styled from 'styled-components';

export const MapWrapper = styled.div`
  /* Got these numbers by measuring the actual svg */
  width: 390px;
  height: 292.5px;
  border: 1px solid black;
`;

export default function AllCountyMaps() {
  return (
    <Fragment>
      {_.keys(STATE_CENTERS).map(state => (
        <MapWrapper key={state}>
          <CountyMapInner location={state} />
        </MapWrapper>
      ))}
    </Fragment>
  );
}
