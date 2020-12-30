import React from 'react';

interface IOrderItem {
    orderNumber: number;
    itemNumber: number;
    name: string;
    color: string,
    size: string,
    status: string;
    imageUrl: string;
}

interface IOrderItems {
    orderItems: Array<IOrderItem>;
}

// const OrderItem = (props: IOrderItem): any => {
//     return (
//         <section>
//             <p>Item Number: {props.itemNumber} - Status: {props.status}</p>
//         </section>
//     );
// };

const OrderItems = (props: IOrderItems): any => {
    if (props.orderItems === undefined || props.orderItems[0] === undefined) {
        return <><p>No data</p></>;
    }

    return (
        <section>
            <h3>Order Number: {props.orderItems[0].orderNumber}</h3>
            <ul style={{textAlign: "left"}}>
                { 
                    props.orderItems.map((item, i) =>
                        <>
                            <li key={i}>
                                Item Number: {item.itemNumber}<br/>
                                Description: {item.name}<br/>
                                Color: {item.color}<br/>
                                Size: {item.size}<br/>
                                Status:{item.status}
                            </li>
                            <img src={item.imageUrl} alt="pix" height={200}/>
                            <br/><br/>
                        </>
                    )
                }
            </ul>
        </section>
    );
};

// export default OrderItem;
export default OrderItems;