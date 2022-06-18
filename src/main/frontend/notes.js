
const App = () => {

  const [product, setProduct] = useState({});

  let productUgly; 

  const x1 = fun1(2);
  const x2 = fun2(2);

  const fun1 = (x) => {
    return x*2;
  } 

  function fun2(x) {
   return x*2; 
  }

  return (
    <div className='App'>
      <UserProfiles/>
    </div>
  )
}

const UserProfiles = () => {
 const fetchUserProfiles = () => {
   axios.get("http://localhost:8080/api/v1/users").then(res => {
     console.log(res);
   }) 
 }

 useEffect(()=>{
   fetchUserProfiles();
 }, []);

 return <h1>Hello</h1>
}