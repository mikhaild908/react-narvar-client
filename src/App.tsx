import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import OrderItems from './OrderItem';

const username = '<username>';
const password = '<password>';

const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

interface Props {
  name: string;
}

interface DateProps {
  year: number;
}

function Header(props: Props) {
  return (
    <header>
      <h1>{props.name}</h1>
    </header>
  );
}

function Footer(props: DateProps) {
  return (
    <footer>
      <p>Copyright {props.year}</p>
    </footer>
  );
}

function App() {
  const defaultOrderNumber = 951648048;
  const [data, setData] = useState(null);
  const [orderNumber, setOrderNumber] = useState(defaultOrderNumber);
  const [tempOrderNumber, setTempOrderNumber] = useState(defaultOrderNumber);
  let orderItems = [];

  const fetchData = useCallback(() => {
    // Note: address CORS issue -> https://cors-anywhere.herokuapp.com/https://ws.narvar.com/api/v1/orders/${orderNumber}
    fetch(`https://cors-anywhere.herokuapp.com/https://ws.narvar.com/api/v1/orders/${orderNumber}`, {
      headers: new Headers({
        "Authorization": auth,
        "Access-Control-Allow-Origin": "http://localhost:3000"
      }),
    })
      .then((response) => response.json())
      .then(setData)
  }, [orderNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if(data) {
    // console.log(data);
    data.order_info.order_items.forEach(element => {
      orderItems.push({
        orderNumber: data.order_info.order_number,
        itemNumber: element.item_id, 
        status: element.fulfillment_status, 
        imageUrl: element.item_image,
        color: element.color,
        size: element.size,
        name: element.name
      })
    });
  }

  return (
    <div className="App">
      <Header name="Narvar"/>
      <input type="text" onChange={(e) => { setTempOrderNumber(Number(e.target.value)) } }/>
      
      <button onClick={ () => {
        setOrderNumber(tempOrderNumber);
      } }>
        Get Info
      </button>
      <OrderItems orderItems={orderItems}/>
      <p>Default Test FL Order Number: 951648048</p>
      <p>Test FL Order Number: 948624513</p>
      <p>Test FL Order Number: 948175320</p>
      <p>Test FL CA Order Number: 948287490</p>
      <p>Test FL CA Order Number: 948514578</p>
      <Footer year={new Date().getFullYear()}/>
    </div>
  );
}

export default App;