
import axios from 'axios';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import useOrders from '../../hooks/useOrders';
import CommonPage from '../CommonPage/CommonPage';

const MyOrders = () => {
    const [orders, setOrders, isLoading, setIsLoading] = useOrders()
    const [error, setError] = useState()

    const handleDeleteOrder = (id) => {
        setIsLoading(true)
        axios.delete(`https://pure-citadel-76424.herokuapp.com/myOrders/${id}`)
            .then(res => {
                setIsLoading(false)
                if (res.data.deletedCount) {
                    const remaining = orders.filter(service => service._id !== id)
                    setOrders(remaining)
                    alert('successfully deleted')
                }
            }).catch(err => setError(err.message))
        console.log(error);
    }

    return (
        <CommonPage>
            {
                isLoading ? (
                    <div className="flex justify-center my-7">
                        <Spinner animation="border" variant="warning" />
                    </div>
                ) : (
                    <div>
                        <section className="flex flex-col justify-center items-center pt-24 md:mx-0 mx-4 mb-10 ">

                            <p className="font-extrabold text-gray-700 border-b-4 border-yellow-500 text-xl md:text-5xl">My Orders</p>
                        </section>
                        <section className="flex justify-center">
                            <div className="md:w-2/4">

                                {
                                    orders.map(order => {
                                        const { _id, title, image, price, categories, status } = order
                                        console.log(status);
                                        return (
                                            <div >
                                                <div className="  flex flex-col md:flex-row items-center justify-between mb-3 shadow-md border p-3">
                                                    <div className="flex flex-col md:flex-row">
                                                        <div className="mx-auto">
                                                            <img src={image} alt="" className=" md:w-24 w-40 md:h-24 md:mr-10" />
                                                        </div>
                                                        <div>
                                                            <h1 className="text-xl font-mono font-bold">{title} </h1>
                                                            <p className="font-bold mb-1">categories:<span className="font-normal font-mono"> {categories}</span></p>
                                                            <p className="text-yellow-600 font-bold">{price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center md:mt-0 mt-3">
                                                        <p className={
                                                            status === "Approved" ?
                                                                "text-sm no-underline text-green-600 font-extrabold   bg-yellow-200 px-6 py-2 tracking-widest mr-5" :
                                                                "text-sm no-underline text-black font-extrabold   bg-yellow-400 px-6 py-2 tracking-widest mr-5"

                                                        }>
                                                            {
                                                                status === "Processing.." ? "Processing..." : "your order" &&
                                                                    status === "Approved" ? "Approved" : "your order"

                                                            }</p>
                                                        <button onClick={() => handleDeleteOrder(_id)}><MdDelete className=" text-3xl text-red-500" /></button>
                                                    </div>
                                                </div>


                                            </div>

                                        )
                                    })
                                }

                            </div>
                        </section>
                    </div>
                )
            }
        </CommonPage>
    );
};

export default MyOrders;