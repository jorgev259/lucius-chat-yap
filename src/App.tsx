import Widget from './Widget'

const queryParams = new URLSearchParams(window.location.search)
const username = queryParams.get('username') ?? ''

export default function App() {
  if (!username) return <div>Please add ?username=myUsername to the url</div>
  return <Widget username={username} />
}
