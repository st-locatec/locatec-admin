/**
 * react-google-maps를 감싼 element
 * 간단히 coords만 인자로 넘기면 그곳에 marker를 찍은 지도를 보여준다.
 */

import {
   withScriptjs,
   withGoogleMap,
   GoogleMap,
   Marker,
} from "react-google-maps";

// 지도를 한번 감싸기
const MapWrap = withScriptjs(
   withGoogleMap(({ coords }) => {
      return (
         <GoogleMap
            defaultZoom={18}
            defaultCenter={{
               lat: coords?.latitude,
               lng: coords?.longitude,
            }}>
            <Marker
               position={{
                  lat: coords?.latitude,
                  lng: coords?.longitude,
               }}
            />
         </GoogleMap>
      );
   })
);

// api kay, 기타 기초 스타일 적용
export default function MapWrapWithScript({ coords }) {
   return (
      <MapWrap
         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}
         loadingElement={<div style={{ height: `100%` }} />}
         containerElement={<div style={{ height: `400px` }} />}
         mapElement={<div style={{ height: `100%` }} />}
         coords={coords}
      />
   );
}
