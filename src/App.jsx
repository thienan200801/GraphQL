import "./App.css";
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
query {
  jobs{
    title
    cities{
      name
    }
    remotes{
      id
    }
    company{
      name
    }
  }
}
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return data.jobs.map((item, id) => {
    <div key={id}>
      <h3>{item.title}</h3>
      <p>{item.cities?.map(city => city.name).join(', ')}</p>
      <p>{item.remotes?.map(remote => remote.id?'Remotes':'').join(', ')}</p>
      <p>{item.company?.map(comp => comp.name).join(', ')}</p>
    </div>
  })

}
export default function App() {
  return (
    <div>
      <DisplayLocations />
    </div>
  );
}