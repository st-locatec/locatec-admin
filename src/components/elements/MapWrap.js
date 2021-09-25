/**
 * react-google-maps를 감싼 element
 * 간단히 coords만 인자로 넘기면 그곳에 marker를 찍은 지도를 보여주고,
 * onClick을 넘기면, 지도에 연동하여 그게 맞는 동작을 한다
 */

import {
   withScriptjs,
   withGoogleMap,
   GoogleMap,
   Marker,
} from "react-google-maps";

// 지도를 한번 감싸기
const MapWrap = withScriptjs(
   withGoogleMap(({ coords, onClick }) => {
      return (
         <GoogleMap
            defaultZoom={18}
            defaultCenter={{
               lat: coords?.latitude,
               lng: coords?.longitude,
            }}
            onClick={onClick ? onClick : () => {}}>
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
export default function MapWrapWithScript({ coords, onClick }) {
   return (
      <MapWrap
         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}
         loadingElement={<div style={{ height: `100%` }} />}
         containerElement={<div style={{ height: `400px` }} />}
         mapElement={<div style={{ height: `100%` }} />}
         coords={coords}
         onClick={onClick}
      />
   );
}
