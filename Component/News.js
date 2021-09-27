import React, { Component } from 'react'
import spinner from './spinner';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps={
        country: 'in',
        pagesize: 6,
        category:'general'
    }

    static propTypes={
        country:PropTypes.string,
        pagesize:PropTypes.number,
        category:PropTypes.string,
    }
    
    constructor(){
        super();
        this.state={
            articles: [],
            loading: false,
            page:1,
            totalResults:0
        }
    }
     async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2ed33edc230640f79d826fb080cd9425&page=1&pageSize=${this.props.pagesize}`
        let data = await fetch(url)
        let parseddata= await data.json()
        this.setState({
            articles: parseddata.articles,
            totalResults:parseddata.totalResults,
            loading: false
        })
    }
    // handlenext= async()=>{
    //     if(this.state.page+1> Math.ceil(this.state.totalResults/15)){

    //     }
    //     else{

        
    //   let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2ed33edc230640f79d826fb080cd9425&page=${this.state.page+1
    // }&pageSize=${this.props.pagesize}`
    //     this.setState({
    //         loading: true
    //     })
    //     let data = await fetch(url)
    //     let parseddata= await data.json()
        
    //     this.setState({
    //         page:this.state.page+1,
    //         articles: parseddata.articles,
    //         loading: false
    //     })
    // }
      
    // }
    //   handleprev= async()=>{
    //     let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2ed33edc230640f79d826fb080cd9425&page=${this.state.page-1
    // }&pageSize=${this.props.pagesize}`
    //     let data = await fetch(url)
    //     let parseddata= await data.json()
    //     this.setState({
    //         loading: true
    //     })
    //     this.setState({
    //         page:this.state.page-1,
    //         articles: parseddata.articles,
    //         loading:false
    //     })
      
    // }
    fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        this.setState({pagesize : this.props.pagesize+1})
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2ed33edc230640f79d826fb080cd9425&page=1&pageSize=${this.props.pagesize}`
        let data = await fetch(url)
        let parseddata= await data.json()
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults:parseddata.totalResults,
            loading: false
        })
      };
    render() {
        return (
            <>
               <h1 className="text-center">Top {this.props.category} headlines</h1>
                {/* <spinner/> */}
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<spinner/>}
        >      <div className="container">
               <div className="row">
                   {this.state.articles.map((element)=>{
                       return <div className="col-md-4" key={element.url}>
                       <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                       </div>
                   })}
                 </div>  
                   
               </div>
               </InfiniteScroll>
            </>
        )
    }
}

export default News
