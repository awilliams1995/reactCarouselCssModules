import React,{Component} from "react";
import classes from './index.css';

// props list = photos,restart(Boolean),restartButton(actual component),active(css classes),static(css classes)

class Carousel extends Component {
	state = {
    photo:1,
    interval:null,
    animation:false,
    initial:true
   }
      componentDidMount = ()=>{
        this.startInterval();
    }
    componentWillUnmount =()=>{
        this.clearIntervalValue(true)
    }
    resetPhoto = ()=>{
        this.setState({
                photo:this.state.photo ===5?1:this.state.photo+1
            })
    }
    toggleAnimation = (num)=>{
        this.state.animation?this.clearIntervalValue():this.resetPhoto();
        this.startInterval()
        this.setState((state)=>{
            return{animation:num?false:!state.animation,photo:state.photo?state.photo:num}
        });
    }
    goToSlide = (num)=>{
        this.state.animation||this.state.initial?this.clearIntervalValue():num?null:this.startInterval();
        this.setState({photo:num,animation:false,initial:false})
    }
    startInterval = (status)=>{
        console.log("startInterval got executed")
        if(!this.state.interval){
          const interval = setInterval(() => {
          this.setState({
                photo:this.state.photo ===5?1:this.state.photo+1,
                animation:true,initial:false
            })
        },5000)
        this.setState({interval});
        }
    }

    clearIntervalValue = (doReset)=>{
        console.log("clearIntervalValue got executed")
        clearInterval(this.state.interval);
        if(!doReset)this.resetInterval()
    }
    resetInterval = ()=>{
        this.setState({interval:false})
    }


	classNameGenerator =(num)=>{
        const rel = Array(this.props.photos.length).fill('x').map((val,index)=>{
        	if(index === 0) return this.props.photos.length
        	return index
        });
        if(num===this.state.photo&&this.state.animation){
            return classes.ImageActive
        }else if(num===this.state.photo){
            return classes.Image
        }
        else if(rel[this.state.photo-1]===num&&this.state.animation){
            return classes.Image2Active
        }else{
            return classes.ImageStatic
        }
    }
	render(){
		const Button = this.props.restartButton;
		const Restart = (Button?<Button/>:null)|| (<button onClick={()=>this.toggleAnimation()} style={{position:'absolute',top:"0px",left:"0px",zIndex:1000}}>would you like to restart the carousel?</button>);

		return(
			<div className={classes.Wrapper}>
					{this.props.restart && !this.state.animation && !this.state.initial?Restart:null}
					{this.props.photos.map((value,index)=>{
						return <img key={index+1} className={`${this.classNameGenerator(index+1)}`} alt={value} src={`${value}`}/>
					})}
					<div className={classes.slickDots}>
						{this.props.photos.map((value,index)=>{
							return(<li key={index+1}>
		            <button  className={this.state.photo===(index+1)?this.props.active||classes.Active:this.props.static||classes.Number} onClick={()=>{this.goToSlide(index+1)}}>
		                {index+1}
		            </button>
		          </li>)
						})}
					</div>
				</div>
				
			)
				}
	}

	
export default Carousel