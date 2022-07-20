import './App.css';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { resultKeyNameFromField } from '@apollo/client/utilities';

// Define mutation
// const MUTATION = gql`
//   mutation AddItems($item: AddToCartInput!){
//     addItem(input: $item){
//       totalItems
//     }
//   }
// `;

// const GET_CART = gql`
//   query getCart($myItem: ID!){
//     cart(id: $myItem){
//       id
//       items{
//         quantity
//       }
//     }
//   }
// `

// function App() {
//   const [addToCartMutation, {data, loading, error}] = useMutation(MUTATION)
//   const [getCart, result] = useLazyQuery(GET_CART)
//   const [idMutate, setIdMuate] = useState('demo')
//   const [cartIdMutate, setCartIdMuate] = useState('demo')

//   useEffect(()=>{
//     addToCartMutation({
//       variables: {
//         item: {
//           id: idMutate,
//           cartId: cartIdMutate,
//           price: 900000,
//         }
//       }
//     })
//     getCart({
//       variables: {
//         myItem: {
//           id: parseInt(1),
//         }
//       }
//     })
//     .then(() => {
//       getCart().then((res) => console.log(res))
//     })
//   }, [addToCartMutation, getCart])

//   return (
//     <div className="App">
//       {result.data?.cart.items.map((item, id)=>{
//         <ul>
//           <li key={id}>{item.id}</li>
//           <li key={id}>{item?.items.quantity}</li>
//         </ul>
//       })}

//       <div>
//         <input type="text" placeholder='put id' onChange={e=>setIdMuate(e.target.value)}/> <br />
//         <input type="text" placeholder='put cartId' onChange={e=>setCartIdMuate(e.target.value)}/>
//         <button onClick={addToCartMutation}>Add</button>
//       </div>
//     </div>
//   );
// }

const ADD_TO_CART = gql`
  mutation AddItems($item: AddToCartInput!) {
    addItem(input: $item) {
      totalItems
    }
  }
`
const GET_CART = gql`
  query {
    cart(id: 1){
      items{
        id
        unitTotal{
          amount
        }
        quantity
      }
    }
  }
`

function App() {
  const [mutate, result] = useMutation(ADD_TO_CART)
  const [getCartQuery, resultQuery] = useLazyQuery(GET_CART)
  const [itemId, setItemId] = useState("")
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    getCartQuery()
  }, [getCartQuery])

  const HandleClick = useCallback(() => {
    mutate({
      variables: {
        item: {
          cartId: "An",
          id: itemId,
          price: price,
          quantity: quantity
        }
      }
    }).then(() => {
      getCartQuery({fetchPolicy: "no-cache"})
    })
  }, [itemId, mutate, price, quantity, getCartQuery]) 

  return <div id="container">
    <div id="item-list">
      {
        resultQuery.data?.cart.items.map((item, index)=>(
          <div key={index}>{item.id}: ${item.unitTotal.amount} x {item.quantity}</div>
        ))
      }
    </div>

    <div id="add-item">
      <div>ID of item: <input onChange={(e) => {setItemId(e.target.value)}}/> </div>
      <div>Price: <input onChange={(e) => {setPrice(e.target.value)}}/> </div>
      <div>Quantity: <input onChange={(e) => {setQuantity(e.target.value)}}/> </div>
      <button onClick={HandleClick}>Add</button>
    </div>

  </div>
}

export default App;
