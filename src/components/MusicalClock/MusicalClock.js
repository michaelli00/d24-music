import React from 'react';
import { 
  Stage, 
  Layer, 
  RegularPolygon, 
  Line,
  Label, 
  Text 
} from 'react-konva';
import { calculateLinePoints } from '../../utils/Utils';

class MusicalClock extends React.Component {

  render() {
    const {
      windowWidth,
      windowHeight,
      triad,
    } = this.props;
    const linePoints = calculateLinePoints(triad, windowWidth, windowHeight);
    return (
      <Stage width={900} height={600}>
        <Layer>
          <RegularPolygon
            x={windowWidth*0.3}
            y={windowHeight/3}
            sides={12}
            radius={200}
            stroke='black'
            strokeWidth={2}
          />
          <Label
            x={windowWidth*0.3 - 5}
            y={windowHeight/3 - 230}
          >
            <Text text="C" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 + 95}
            y={windowHeight/3 - 200}
          >
            <Text text="C#/D♭" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 + 175}
            y={windowHeight/3 - 130}
          >
            <Text text="D" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 + 210}
            y={windowHeight/3 - 10}
          >
            <Text text="D#/E♭" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 + 175}
            y={windowHeight/3 + 110}
          >
            <Text text="E" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 + 100}
            y={windowHeight/3 + 185}
          >
            <Text text="F" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 - 5}
            y={windowHeight/3 + 210}
          >
            <Text text="F#/G♭" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 - 110}
            y={windowHeight/3 + 185}
          >
            <Text text="G" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 - 220}
            y={windowHeight/3 + 110}
          >
            <Text text="G#/A♭" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 - 235}
            y={windowHeight/3 - 10}
          >
            <Text text="A" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 - 225}
            y={windowHeight/3 - 125}
          >
            <Text text="A#/B♭" fontSize={20}/>
          </Label>
          <Label
            x={windowWidth*0.3 - 130}
            y={windowHeight/3 - 200}
          >
            <Text text="B" fontSize={20}/>
          </Label>
          <Line points={linePoints} strokeWidth={3} stroke="red"/>
        </Layer>
      </Stage>
    );
  }
}

export default MusicalClock;
