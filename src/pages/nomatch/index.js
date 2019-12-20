import React from 'react';

export default class NoMatch extends React.Component{
  render() {
    return (
      <div style={{textAlign:'center', fontSize:'30px',padding:'40px',fontWeight:'bold'}}>
        404 Not Found！！！<br/>
        小主，不好意思，您好像走丢了！！！
      </div>
    )
  }
}