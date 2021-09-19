import {
   withScriptjs,
   withGoogleMap,
   GoogleMap,
   Marker,
} from "react-google-maps";

const MapWrap = withScriptjs(
   withGoogleMap(({ coords }) => {
      return (
         <GoogleMap
            defaultZoom={18}
            defaultCenter={{
               lat: coords.latitude,
               lng: coords.longitude,
            }}>
            <Marker
               position={{
                  lat: coords.latitude,
                  lng: coords.longitude,
               }}
            />
         </GoogleMap>
      );
   })
);

export default function MapWrapWithScript({ coords }) {
   return (
      <MapWrap
         googleMapURL={`https://maps.googleapis.com/maps/api/js?\
     key=${process.env.REACT_APP_GOOGLEMAP_KEY}&\
     v=3.exp&libraries=geometry,drawing,places`}
         loadingElement={<div style={{ height: `100%` }} />}
         containerElement={<div style={{ height: `400px` }} />}
         mapElement={<div style={{ height: `100%` }} />}
         coords={coords}
      />
   );
}
