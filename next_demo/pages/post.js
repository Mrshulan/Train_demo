import Layout from '../components/Layout'

export default (props) => {
  console.log(props)
  return (
    // url.query.title没有用？？唉
    <Layout>
      {/* js进来 和 ssr进来 */}
      <h1>{props.query.title}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  )
}

