import React, { useState, useEffect, useRef, } from 'react';
import { Annotorious } from '@recogito/annotorious';
import './Anno.css'
import { FaRegSquare,FaDrawPolygon } from 'react-icons/fa';

const Annotoriouss = () => {

  const [img,setImg]=useState(null)
  const handleChange=e=>{

    const reader=new FileReader();
    reader.onload=()=>{
      setImg(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
   }

      const imgEl = useRef();
      const [ anno, setAnno ] = useState();
      const [ tool, setTool ] = useState('rect');


      useEffect(() => {
        let annotorious = null;
    
        if (imgEl.current) {
          annotorious = new Annotorious({
            image: imgEl.current
          });
    
          annotorious.on('createAnnotation', annotation => {
            console.log('created', annotation);
          });
    
          annotorious.on('updateAnnotation', (annotation, previous) => {
            console.log('updated', annotation, previous);
          });
    
          annotorious.on('deleteAnnotation', annotation => {
            console.log('deleted', annotation);
          });
        }
    
        setAnno(annotorious);
    
        return () => annotorious.destroy();
      }, []);

      const handleRectangle=()=>{
        setTool('rect');
        anno.setDrawingTool('rect');
      }

      const handlePolygon=()=>{
        setTool('polygon');
        anno.setDrawingTool('polygon');
      }

  return (
    <div className='main-div'>
      <div className='container child-div'>
         <div >
        <input type="file" onChange={(e)=>handleChange(e)} />
          <div>
              <div className='mt-4'>
                <button onClick={handleRectangle}><FaRegSquare size={25}/></button>
                <button className='ms-2' onClick={handlePolygon}><FaDrawPolygon size={25}/></button>
              </div>
              <img className='image' 
                  ref={imgEl} 
                  src={img} />
          </div>
          </div>
      </div>
    </div>
  );
};

export default Annotoriouss;