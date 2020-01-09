import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import PhotoSwipe from "photoswipe";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default"; // 默认UI
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import "./index.less";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    this.closeGallary()
  }

  openGallery = (item) => {
    const items = [
      {
        src: item,
        w: 0,
        h: 0
      }
    ]

    const options = {index: 0}
    this.gallary = new PhotoSwipe(this.pswpElement, PhotoswipeUIDefault, items, options)
    this.gallary.listen('gettingData', (index, value) => {
      let img = new Image();
      img.src = value.src;
      value.w = img.width;
      value.h = img.height;

      // const that = this
      // if (value.w < 1 || value.h < 1) {
      //   // unknow size
      //   const img = new Image();
      //   img.onload = function() {
      //     // will get size after load
      //     value.w = this.width; // set image width
      //     value.h = this.height; // set image height
      //     // that.gallery.invalidateCurrItems() // reinit Items
      //     // that.gallery.updateSize(true) // reinit Items
      //   }
      //   img.src = value.src // let's download image
      // }
 
    })
    this.gallary.init()
  }

  closeGallary = () => {
    if (!this.gallary) {
      return 
    }
    this.gallary.close()
  }

  render() {
    const imgs = [
      [
        require('../gallary/1.png'),
        require('../gallary/2.png'),
        require('../gallary/3.png'),
        require('../gallary/4.png'),
        require('../gallary/5.png'),
      ],
      [
        require('../gallary/6.png'),
        require('../gallary/7.png'),
        require('../gallary/8.png'),
        require('../gallary/9.png'),
        require('../gallary/10.png'),
      ],
      [
        require('../gallary/11.png'),
        require('../gallary/12.png'),
        require('../gallary/13.png'),
        require('../gallary/14.png'),
        require('../gallary/15.png'),
      ],
      [
        require('../gallary/16.png'),
        require('../gallary/17.png'),
        require('../gallary/18.png'),
        require('../gallary/19.png'),
        require('../gallary/20.png'),
      ],
      [
        require('../gallary/21.png'),
        require('../gallary/22.png'),
        require('../gallary/23.png'),
        require('../gallary/24.png'),
        require('../gallary/25.png'),
      ]
    ]

    const imgsTag = imgs.map((v1, index1) => 
      v1.map((v2, index2) => (
        <div key={ index2 } className="cloud-box">
          <Card key={index1 * index2} bordered bodyStyle={{padding: 0}}>
            <div>
              <img ref={img => this.imgEle = img} src={v2} onClick={() => this.openGallery(v2)} alt="example" width="100%" />
            </div>
            <div className="pa-m">
              <h3>React Admin</h3>
              <small>
                <a href="https://github.com/pengliangren/react_antd" target="_blank" rel="noopener noreferrer">
                  https://github.com/pengliangren/react_antd
                </a>
              </small>
            </div>
          </Card>
        </div>
      ))
    )

    return (
      <div>
        <Row gutter={10}>
          <Col key={0} span={5}>{imgsTag[0]}</Col>
          <Col key={1} span={5}>{imgsTag[1]}</Col>
          <Col key={2} span={5}>{imgsTag[2]}</Col>
          <Col key={3} span={5}>{imgsTag[3]}</Col>
          <Col key={4} span={4}>{imgsTag[4]}</Col>
        </Row>
        <div
          className="pswp"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          ref={div => (this.pswpElement = div)}
        >
          <div className="pswp__bg"></div>
          {/* Slides wrapper with overflow:hidden. */}
          <div className="pswp__scroll-wrap">
            <div className="pswp__container">
              <div className="pswp__item"></div>
              <div className="pswp__item"></div>
              <div className="pswp__item"></div>
            </div>

            <div className="pswp__ui pswp__ui--hidden">
              <div className="pswp__top-bar">
                <div className="pswp__counter"></div>

                <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button className="pswp__button pswp__button--share" title="Share"></button>

                <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <div className="pswp__preloader">
                    <div className="pswp__preloader__icn">
                      <div className="pswp__preloader__cut">
                        <div className="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>

              </div>
              <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div className="pswp__share-tooltip"></div> 
              </div>

              <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
              </button>

              <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
              </button>

              <div className="pswp__caption">
                <div className="pswp__caption__center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Album;
