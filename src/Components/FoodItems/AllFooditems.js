import React from 'react';
import { Card } from 'react-bootstrap';

const AllFooditems = ({ elm, handleOrders }) => {

    const { _id, image, title, categories, price, description , status} = elm
    const myItems ={ image, title, categories, price, description,status}
    return (
        <div>
            <Card style={{ height: '500px' }} className="hover:shadow-xl md:w-96 w-80">
                <div className="h-3/5">
                    <img src={image} alt="" className="h-full w-full" />
                </div>
                <Card.Body>
                    <Card.Title className=" text-2xl font-mono font-bold">{title}
                    <span className="text-sm">({categories})</span>
                    </Card.Title>
                    <Card.Text className=" text-justify">
                        {description}
                    </Card.Text>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-yellow-600 text-2xl font-bold ">{price}</p>
                        <button onClick={() => handleOrders(myItems,_id)} className=" px-4 py-2 bg-yellow-300 text-black font-bold uppercase rounded-lg">order</button>
                    </div>

                </Card.Body>

            </Card>
        </div>
    );
};

export default AllFooditems;