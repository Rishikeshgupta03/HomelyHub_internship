import {propertyDetailsAction} from "./propertyDetails-slice.js";
import {axiosInstance} from "../../utils/axios.js";

//fetch the details of one specific property uing ids
//receive property id
//start loading 
//call backend api
//wait for response 
//get the proprty data 
//store the details in redux
//if error store error in redux

export const getPropertyDetails =(id)=>async(dispatch)=>{
	try{
		
		dispatch(propertyDetailsAction.getListRequest());
		const response =await axiosInstance(`/v1/rent/listing/${id}`)
		console.log(response);
		if(!response){
			throw new Error("could not fetch any propertyDetails")
		}
		const {data}= response.data;
		dispatch(propertyDetailsAction.getPropertyDetails(data))
	}catch(err){
		dispatch(propertyDetailsAction.getErrors(err.response.data.err))
		
	}
	
}