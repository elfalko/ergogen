// from https://github.com/MvEerd/ergogen/blob/mveerd/src/footprints/trace.js
module.exports = {
  params: {
    class: 'TRACE',
    side: "F",
    points: [[0,0], [10,10]],
    width: 0.25,
    reverse: false
  },
  body: p => p.param.points.map((point, index) => {
    const toPoint = p.param.points?.[index + 1];
    if (!toPoint) {
      return;
    }

    if (!p.param.reverse){
      return (`
        (segment 
        (start ${p.xy(point[0], -point[1])})
        (end ${p.xy(toPoint[0], -toPoint[1])})
        (width ${p.param.width})
        (layer "${p.param.side}.Cu")
        )
      `);
    }else{
      return (`
        (segment 
        (start ${p.xy(point[0], -point[1])})
        (end ${p.xy(toPoint[0], -toPoint[1])})
        (width ${p.param.width})
        (layer "F.Cu")
        )
        (segment 
        (start ${p.xy(point[0], -point[1])})
        (end ${p.xy(toPoint[0], -toPoint[1])})
        (width ${p.param.width})
        (layer "B.Cu")
        )
      `);
    }
  }).join('\n')
}
