import React, { useRef } from 'react'

const StyleGuidePage = () => {
  const colorsCore = useRef(null)
  const colorsGrey = useRef(null)

  if (colorsCore.current != null) {
    Array.from(colorsCore.current.children).forEach(el => {
      const hex = getStyles('background-color', el)

      function createMarkup() {
        return { __html: hex }
      }
      // el.setAttribute('dangerouslySetInnerHTML', hex )
      el.innerHTML = hex
    })
  }

  function getStyles(attribute, ref) {
    if (typeof window != 'undefined') {
      const value = window
        .getComputedStyle(ref)
        .getPropertyValue(attribute)
      const rgbArr = value.replace(/[a-z,(,)]/gi, '').split(' ')
      const hex = fullColorHex(rgbArr[0], rgbArr[1], rgbArr[2])
      return hex
    }
  }

  function rgbToHex(rgb) {
    let hex = Number(rgb).toString(16)
    if (hex.length < 2) {
      hex = '0' + hex
    }
    return hex
  }

  function fullColorHex(r, g, b) {
    const red = rgbToHex(r)
    const green = rgbToHex(g)
    const blue = rgbToHex(b)
    return red + green + blue
  }

  return (
    <div className="page container style-guide">
      <div className="container__content style-guide">
        <h1>Style Guide</h1>
        <section className="color section">
          <h3 className="h4">Color</h3>
          <div className="core margin__all">
            <div ref={colorsCore} className="core__ratio">
              <div className="pri"></div>
              <div className="sec"></div>
              <div className="ter"></div>
              <div className="quad"></div>
            </div>
          </div>
          <div className="grey-scale margin__all">
            <div className="bg-light"></div>
            <div className="bg-grey-1"></div>
            <div className="bg-grey-2"></div>
            <div className="bg-grey-3"></div>
            <div className="bg-grey-4"></div>
            <div className="bg-grey-5"></div>
            <div className="bg-grey-6"></div>
            <div className="bg-grey-7"></div>
            <div className="bg-grey-8"></div>
            <div className="bg-dark"></div>
          </div>
        </section>
        <section className="section">
          <h3 className="h4">Typography</h3>
          <div className="">
            <div className="h1">Header 1</div>
            <div className="h2">Header 2</div>
            <div className="h3">Header 3</div>
            <div className="h4">Header 4</div>
            <div className="h5">Header 5</div>
            <div className="h6">Header 6</div>
            <div className="body__large char__readable margin__y">
              Nisi nostrud eu in ex sit culpa labore officia ut amet
              reprehenderit. Nisi magna occaecat ullamco enim aliquip
              ipsum consectetur non tempor mollit sunt id. Ut id velit
              ut laborum ipsum minim labore.
            </div>
            <div className="body__default char__readable margin__y">
              Nisi nostrud eu in ex sit culpa labore officia ut amet
              reprehenderit. Nisi magna occaecat ullamco enim aliquip
              ipsum consectetur non tempor mollit sunt id. Ut id velit
              ut laborum ipsum minim labore.
            </div>
            <div className="body__small char__readable margin__y">
              Nisi nostrud eu in ex sit culpa labore officia ut amet
              reprehenderit. Nisi magna occaecat ullamco enim aliquip
              ipsum consectetur non tempor mollit sunt id. Ut id velit
              ut laborum ipsum minim labore.
            </div>
          </div>
        </section>
        <section className="section">
          <h3 className="h4">Components</h3>
          <div className="featured container">
            <div className="card quote featured">
              <div className="quote__body h5">
                Pride costs us more than hunger, thirst, and cold.
              </div>
              <div className="quote__author">Thomas Jefferson</div>
            </div>
          </div>

          <div className="card quote">
            <div className="quote__body h6">
              Pride costs us more than hunger, thirst, and cold.
            </div>
            <div className="quote__author">Thomas Jefferson</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default StyleGuidePage
