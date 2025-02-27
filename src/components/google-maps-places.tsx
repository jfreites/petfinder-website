"use client";

//import React, { useEffect, useState, useRef } from "react";
//import { useLoadScript } from "@react-google-maps/api";

//const libraries = ['places'];

export function GoogleMapsPLaces() {
    // const [input, setInput] = useState({});
    // const inputRef = useRef(null);

    // const { isLoaded, loadError } = useLoadScript({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    //     libraries: ['places'],
    // });

    // useEffect(() => {
    //     if (!isLoaded || loadError) return;
    
    //     const options = {
    //       componentRestrictions: { country: "mx" },
    //       fields: ["address_components", "geometry"],
    //     };
    
    //     const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
    //     autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));
    
    //     // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
    // }, [isLoaded, loadError]);

    // const handleChange = (event: { target: { name: any; value: any; }; }) => {
    //     const {name, value} = event.target;
    //     setInput((values) => ({ ...values, [name]: value }));
    // };

    // const handlePlaceChanged = async(address) => {
    //     if (!isLoaded) return;
    //     const place = address.getPlace()
    
    //     if (!place || !place.geometry) {
    //       setInput({});
    //       return;
    //     }
    //     formData(place);
    // };

    // const formData = (data) => {
    //     const addressComponents = data?.address_components;
    
    //     const componentMap = {
    //       subPremise: "",
    //       premise: "",
    //       street_number: "",
    //       route: "",
    //       country: "",
    //       postal_code: "",
    //       administrative_area_level_2: "",
    //       administrative_area_level_1: "",
    //     };
    
    //     for (const component of addressComponents) {
    //       const componentType = component.types[0];
    //       if (componentMap.hasOwnProperty(componentType)) {
    //         componentMap[componentType] = component.long_name;
    //       }
    //     }
    
    //     const formattedAddress =
    //       `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
    //     const latitude = data?.geometry?.location?.lat();
    //     const longitude = data?.geometry?.location?.lng();
    
    //     setInput((values) => ({
    //       ...values,
    //       streetAddress: formattedAddress,
    //       country: componentMap.country,
    //       zipCode: componentMap.postal_code,
    //       city: componentMap.administrative_area_level_2,
    //       state: componentMap.administrative_area_level_1,
    //       latitude: latitude,
    //       longitude: longitude,
    //     }));
    //   };

    // return (
    //     isLoaded && (
    //         <div className="p-4 grid grid-cols-2 gap-5">
    //             <div className="flex flex-col w-full">
    //                 <label htmlFor="streetAddress" className="text-md">
    //                     Street Address
    //                 </label>
    //                 <input 
    //                     type="text" 
    //                     name="streetAddress" 
    //                     ref={inputRef} 
    //                     value={input.streetAddress || ""} 
    //                     onChange={handleChange} 
    //                     className=""
    //                     placeholder="Enter your street address"
    //                     required
    //                 />
    //             </div>
    //             <div className="flex flex-col w-full">
    //                 <label htmlFor="city" className="text-md">
    //                     City
    //                 </label>
    //                 <input 
    //                     type="text" 
    //                     name="city" 
    //                     value={input.city || ""} 
    //                     onChange={handleChange} 
    //                     className=""
    //                     required
    //                 />
    //             </div>
    //             <div className="flex flex-col w-full">
    //                 <label htmlFor="state" className="text-md">
    //                     State
    //                 </label>
    //                 <input 
    //                     type="text" 
    //                     name="state" 
    //                     value={input.state || ""} 
    //                     onChange={handleChange} 
    //                     className=""
    //                     required
    //                 />
    //             </div>
    //             <div className="flex flex-col w-full">
    //                 <label htmlFor="zipCode" className="text-md">
    //                     POstal code
    //                 </label>
    //                 <input 
    //                     type="text" 
    //                     name="zipCode" 
    //                     value={input.zipCode || ""} 
    //                     onChange={handleChange} 
    //                     className=""
    //                     required
    //                 />
    //             </div>
    //         </div>
    //     )
    // )
    return (
        <div>
            TBD
        </div>
    )
}