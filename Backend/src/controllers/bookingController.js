import {Property} from "../Models/propertyModel.js";
import {Booking} from "../Models/bookingModel.js";

//crete order :booking any property
const createOrder= async(req,res)=>{
	const {amount,propertyId,fromDate,toDate,guests} = req.body;
	
	//orderid
	const orderId="order_"+ Date.now();
	res.json({
		sucess:true,
		message:"order created successfully",
		orderId,
		amount,
		propertyId,
		fromDate,
		toDate,
		guests
	})
}

//verify payment

const verifyPayment =async(req,res)=>{
	const{orderId, bookingDetails, forceStatus}=req.body;
	
	if(forceStatus === "success"){
		const paymentId ="pay_"+ Date.now();
		
		//save Booking
		const newBooking= await Booking.create({
			user: req.user._id,
			property: bookingDetails.propertyId,
			price: bookingDetails.price,
			fromDate :bookingDetails.fromDate,
			toDate: bookingDetails.toDate,
			guests:bookingDetails.guests,
			numberOfnights: bookingDetails.nights,
			paid:true
		});
		
		//tell property those dates are taken 
		const updatedProperty= await Property.findByIdAndUpdate(
		bookingDetails.propertyId,{
			$push:{
				currentBookings:{
					bookingId: newBooking._id,
					fromDate: bookingDetails.fromDate,
					toDate: bookingDetails.toDate,
					userId: req.user._id
				}
			}
		},
		{new:true}
		);
		
		res.json({
			success:true,
			message:"payment successful, Booking confirmed!!",
			paymentId,
			orderId,
			booking:newBooking
		});
	}
	else{
		res.status(400).json({
			success:false,
			message:"Payment Failed!",
			orderId
		})
	}
}

//get my booking 

const getUserBookings=async(req,res)=>{
	try{ 
		const bookings =await Booking.find({user:req.user._id});
		
		res.status(200).json({
			status:"success",
			data:{
				bookings
			}
		})
	}catch(err){
		res.status(401).json({
			status:"fail",
			message:err.message
		})
	}
}

//get one booking details
// :/bookingId

const getBookingDetails =async(req,res)=>{
	try{
		const bookings =await Booking.findById(req.params.bookingId);
		
		res.status(200).json({
			status:"success",
			data:{
				bookings
			}
		})
	}catch(err){
		res.status(401).json({
			status:"fail",
			message:err.message
		})
	}
}


export {getBookingDetails,getUserBookings,createOrder,verifyPayment}