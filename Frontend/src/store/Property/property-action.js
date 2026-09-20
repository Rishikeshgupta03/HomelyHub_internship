import { propertyAction } from "./property-slice.js";
import { axiosInstance } from "../../utils/axios";

//get all properties 
//start api request
//tell redux loading started 
//get search parameters
//call backend api
//wait for response
//get property data
//send data to redux store
//if error=> send it to redux

export const getAllProperties = () => async (dispatch, getState) => {
  try {
    dispatch(propertyAction.getRequest());
    const { searchParams } = getState().properties;
    
    const response = await axiosInstance.get(`/v1/rent/listing`, {
      params: { ...searchParams }
    });
    
    if (!response) {
      throw new Error("Could not fetch any properties");
    }
    
    dispatch(propertyAction.getAllProperties(response.data));
  } catch (err) {
    dispatch(propertyAction.getErrors(err.message));
  }
};
