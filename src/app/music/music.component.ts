import { Component, AfterViewInit } from '@angular/core';
import { WindowService } from '../services/window.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements AfterViewInit {

 private frequencyData = new Uint8Array(200);

   private svgHeight = 300;
   private svgWidth = 1200;
   private barPadding = 1;
   private svg : any;
   private audioCtx :any ;
   private audioSrc :any ;
   private analyser : any;
   private audioElement : any;
   private window : any;
   private audioUrl = "";


constructor(private _window : WindowService){
  this.window = _window.nativeWindow;

}

ngAfterViewInit() {
  this.svg = this.createSvg('body', this.svgHeight , this.svgWidth);
  this.initAudioMiddleWare();
  this.renderChart();

}
audioPlayer(action) {
  if(action=='Play'){
    this.window.document.getElementById('audioElement').play();
  
  }
  if(action=='Pause'){
    this.window.document.getElementById('audioElement').pause();
  }
  if(action=='High')
    this.window.document.getElementById('audioElement').volume+=0.1;
  if(action=='Low')
    this.window.document.getElementById('audioElement').volume-=0.1;
}
initAudioMiddleWare () {
  this.audioCtx = new (this.window.AudioContext || this.window.webkitAudioContext)();
//console.log(this.audioCtx);
  this.audioElement = this.window.document.getElementById('audioElement');
//console.log(this.audioElement);
   this.audioSrc = this.audioCtx.createMediaElementSource(this.audioElement);
// console.log(this.audioSrc);
   this.analyser = this.audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  this.audioSrc.connect(this.analyser);
  this.audioSrc.connect(this.audioCtx.destination);
  this.svg.selectAll('rect')
     .data(this.frequencyData)
     .enter()
     .append('rect')
     .attr('x', (d, i) => {
        return i * (this.svgWidth / this.frequencyData.length);
     })
     .attr('width', this.svgWidth / this.frequencyData.length - this.barPadding);

}
createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }
   
 

  // Continuously loop and update chart with frequency data.
   renderChart = ()=> {
     this.window.requestAnimationFrame(this.renderChart);
     this.analyser.getByteFrequencyData(this.frequencyData);

     // Update d3 chart with new data.
       this.svg.selectAll('rect')
        .data(this.frequencyData)
        .attr('y', (d) => {
           return this.svgHeight - d;
        })
        .attr('height', (d)=> {
           return d;
        })
        .attr('fill', (d,i)=> {
           return 'rgb('+d+','+d+','+d+')';
        });
  

  }

  // Run the loop
  

}