import Link from 'next/link'
import Layout from '../components/Layout.js'
import axios from 'axios'

const App = (props) => {
  // getInitialProps就会把异步的数据当做props传进来
  // console.log(props)
  return (
    <Layout>
      <h1>Welcome to next.js!</h1>
      <ul>
        { props.shows.map(({show}) => (
          <li key={show.id}>
            <Link 
              as={`/p/${show.id}`}
              href={`/post?title=${show.id}`}
              >
              <a>{show.name}</a>
            </Link>
          </li>
        ))}  
      </ul>
      <Link href='/about'>
        <a>测试redux数据流</a>
      </Link>
      {/* next自带babel编译解析styled-jsx 其样式默认不会应用到子组件 应当使用<style jsx global> */}
      <style jsx>{`
      h1 {
        color: blue;
        font-family: "Arial";
      }
      ul {
        padding: 0;
      }
      li {
        list-style: none;
        margin: 5px 0;
      }
      a:hover {
        opacity: 0.6;
      }
    `}</style>
    </Layout>
  )
}

App.getInitialProps = async function () {
  const data = await axios('https://api.tvmaze.com/search/shows?q=batman').then(res => res.data)
  
  return {
    shows: data
  }
}

// const PostLink = (props) => (
//   <li>
//     {/* as映射的是 href 属性 同时还需要 服务端路由遮盖 */}
//     <Link as={`/p/${props.id}`} href={{pathname: 'post', query:{ title: props.title }}}>
//       <a>{props.title}</a>
//     </Link>
//   </li>
// )

// function App() {
//   return (
//     <Layout>
//       <h1>Welcome to next.js!</h1>
//       <ul>
//         <PostLink 
//           id='Hello Next.js'
//           title='Hello Next.js'/>
//         <PostLink 
//           id='Next.js is awesome'
//           title='Next.js is awesome'/>
//         <PostLink 
//           id='Deploy apps with Zeit'
//           title='Deploy apps with Zeit'/>
//       </ul>
//     </Layout>
//   )
// }

export default App