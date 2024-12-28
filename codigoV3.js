
var posicion=document.getElementsByName("pos");
var stard=document.getElementById("inicio");
var reset=document.getElementById("reinicio");
var c1=document.getElementById("p1");
var c2=document.getElementById("p2");
var c3=document.getElementById("p3");
var c4=document.getElementById("p4");
var c5=document.getElementById("p5");
var c6=document.getElementById("p6");
var c7=document.getElementById("p7");
var c8=document.getElementById("p8");
var c9=document.getElementById("p9");
var c10=document.getElementById("p10");
var c11=document.getElementById("p11");
var c12=document.getElementById("p12");
var c13=document.getElementById("p13");
var c14=document.getElementById("p14");
var c15=document.getElementById("p15");
var c16=document.getElementById("p16");
var c17=document.getElementById("p17");
var c18=document.getElementById("p18");
var c19=document.getElementById("p19");
var c20=document.getElementById("p20");
var c21=document.getElementById("p21");
var c22=document.getElementById("p22");
var c23=document.getElementById("p23");
var c24=document.getElementById("p24");
var c25=document.getElementById("p25");
var c26=document.getElementById("p26");
var c27=document.getElementById("p27");
var c28=document.getElementById("p28");
var c29=document.getElementById("p29");
var c30=document.getElementById("p30");
var c31=document.getElementById("p31");
var c32=document.getElementById("p32");
var blancas=12;
var negras=12;
var marca;
var dibuja;
var i;
var activo=0;
var jugar=0;
var x1;
var y1;
var x2;
var y2;
var x;
var y;
var color;
var turno=1;
//Reinicio
	reset.addEventListener("click",function(){
		document.location.reload();
	},false);
//Iniciar
	stard.addEventListener("click",function(){
		activo++;
		jugar=1;
		if(activo==1){
			for(i=0;i<posicion.length;i++){
				if(posicion[i].getAttribute("f")!=2){
					if(posicion[i].getAttribute("f")==1){
						var div=document.createElement("div");
						div.className="fichaN";
						posicion[i].appendChild(div);
					}
					else if(posicion[i].getAttribute("f")==0){
						var div=document.createElement("div");
						div.className="fichaB";
						posicion[i].appendChild(div);
					}
				}
			}
		}
		
	},false);

//Funciones
	function salto(){
		color=parseInt(marca.getAttribute("f"));
		x1=parseInt(marca.getAttribute("x"));
		y1=parseInt(marca.getAttribute("y"));
		x2=parseInt(dibuja.getAttribute("x"));
		y2=parseInt(dibuja.getAttribute("y"));
		x=Math.abs(x2-x1);
		y=Math.abs(y2-y1);
		if(x==2 && y==2){
			x=(x1+x2)/2;
			y=(y1+y2)/2;
			for(i=0;i<posicion.length;i++){
				var tmpx=parseInt(posicion[i].getAttribute("x"));
				var tmpy=parseInt(posicion[i].getAttribute("y"));
				if(tmpx==x && tmpy==y && posicion[i].getAttribute("f")!=2 && posicion[i].getAttribute("f")!=color){
					var tmpc=parseInt(posicion[i].getAttribute("f"));
					if(color==3 || color==4){
						posicion[i].setAttribute("f","2");
						posicion[i].removeChild(posicion[i].firstChild);
						ganar1(tmpc);
						return true;
					}
					else if(color==0 && y1>y2){
						posicion[i].setAttribute("f","2");
						posicion[i].removeChild(posicion[i].firstChild);
						ganar1(tmpc);
						return true;
					}
					else if(color==1 && y1<y2){
						posicion[i].setAttribute("f","2");
						posicion[i].removeChild(posicion[i].firstChild);
						ganar1(tmpc);
						return true;
					}					
					return false;
				}
			}
		}
		return false;
	}

	function movimiento(){
		color=parseInt(marca.getAttribute("f"));
		reina=parseInt(marca.getAttribute("r"));
		x1=parseInt(marca.getAttribute("x"));
		y1=parseInt(marca.getAttribute("y"));
		x2=parseInt(dibuja.getAttribute("x"));
		y2=parseInt(dibuja.getAttribute("y"));
		x=Math.abs(x2-x1);
		y=Math.abs(y2-y1);
		if(reina==1 && x==1 && y==1){
			return true;
		}
		else if(x==1 && y==1 && y1!=y2){
			if(color==0 && y1>y2){
				return true;
			}
			else if(color==1 && y1<y2){
				return true;
			}
			return false;
		}
		else{
			return false;
		}
	}

	function reinas(){
		color=parseInt(marca.getAttribute("f"));
		y=parseInt(dibuja.getAttribute("y"));
		if(y==0 && color==0){
			marca.setAttribute("f","3");
			marca.setAttribute("r","1");
		}
		else if(y==7 && color==1){
			marca.setAttribute("f","4");
			marca.setAttribute("r","1");
		}
	}

	function fturno(){
		color=parseInt(marca.getAttribute("f"));
		if((color==0 || color==3) && turno==1){
			return true;
		}
		else if((color==1 || color==4) && turno==0){
			return true;
		}
		else{
			if(turno==1){
				alert("Mueven Blancas");
				return false;
			}
			else{
				alert("Mueven Negras");
				return false;
			}
			
		}
	}
//primera condicion de ganar (el jugador contrario se queda sin fichas)
	function ganar1(elim) {
		if(elim==0 || elim==3){
			blancas--;
			if(blancas==0){
				activo=0;
				alert("GANAN NEGRAS\n¡¡FELICIDADES!!");
			}
		}
		else if(elim==1 || elim==4){
			negras--;
			if(negras==0){
				activo=0;
				alert("GANAN BLANCAS\n¡¡FELICIDADES!!");
			}
		}
	}
//funciones que verifican la segunda condicion de ganar(imposibilidad de mover)
	function ganar2(){//poner despues de que se dibuja
		var z=parseInt(dibuja.getAttribute("f"));
		if(verificar1()==false && z==0){
			activo=0;
			alert("GANAN BLANCAS\n¡¡FELICIDADES!!");
		}
		else if(verificar1()==false && z==1){
			activo=0;
			alert("GANAN NEGRAS\n¡¡FELICIDADES!!");
		}
	}

	function verificar1(){ 
		
		if(dibuja.getAttribute("f")==0){ //blancas
			for (var j=0;j<posicion.length;j++) {				
				var gnr=parseInt(posicion[j].getAttribute("f"));
				if(gnr==1 || gnr==4){ //buscar en negras
					var ax=parseInt(posicion[j].getAttribute("x"));
					var ay=parseInt(posicion[j].getAttribute("y"));
					//hacia abajo
					//izquierdo
					if(clr(ax-1,ay+1)==2){
						return true;
					}
					else if(clr(ax-1,ay+1)==0 || clr(ax-1,ay+1)==3){
						if(verificar2(ax-2,ay+2)==true){return true;}
					}

					//derecho
					if(clr(ax+1,ay+1)==2){
						return true;
					}
					else if(clr(ax+1,ay+1)==0 || clr(ax+1,ay+1)==3){
						if(verificar2(ax+2,ay+2)==true){return true;}
					}					

					if(gnr==4){ //si existen reinas
						//hacia arriba
						//izquierdo
						if(clr(ax-1,ay-1)==2){
							return true;
						}
						else if(clr(ax-1,ay-1)==0 || clr(ax-1,ay-1)==3){
							if(verificar2(ax-2,ay-2)==true){return true;}
						}
						
						//derecho
						if(clr(ax+1,ay-1)==2){
							return true;
						}
						else if(clr(ax+1,ay-1)==0 || clr(ax+1,ay-1)==3){
							if(verificar2(ax+2,ay-2)==true){return true;}
						}
						
					}
				}			
			}
			return false; //no se puede mover mas	
		}
		else if(dibuja.getAttribute("f")==1){ //negras
			for (var j=0;j<posicion.length;j++) {
				var gnr=parseInt(posicion[j].getAttribute("f"));
				if(gnr==3 || gnr==0){ //buscar en blancas
					var ax=parseInt(posicion[j].getAttribute("x"));
					var ay=parseInt(posicion[j].getAttribute("y"));
					//hacia arriba
					//izquierdo
					if(clr(ax-1,ay-1)==2){
						return true;
					}
					else if(clr(ax-1,ay-1)==1 || clr(ax-1,ay-1)==4){
						if(verificar2(ax-2,ay-2)==true){return true;}
					}					
					//derecho
					if(clr(ax+1,ay-1)==2){
						return true;
					}
					else if(clr(ax+1,ay-1)==1 || clr(ax+1,ay-1)==4){
						if(verificar2(ax+2,ay-2)==true){return true;}
					}

					if(gnr==3){ //si existen reinas
						//hacia abajo
						//izquierdo
						if(clr(ax-1,ay+1)==2){
							return true;
						}
						else if(clr(ax-1,ay+1)==1 || clr(ax-1,ay+1)==4){
							if(verificar2(ax-2,ay+2)==true){return true;}
						}
						//derecho
						if(clr(ax+1,ay+1)==2){
							return true;
						}
						else if(clr(ax+1,ay+1)==1 || clr(ax+1,ay+1)==4){
							if(verificar2(ax+2,ay+2)==true){return true;}
						}
						
					}
				}			
			}
			return false; //no se puede mover mas
		}		
	}

	function verificar2(cx,cy){
		for (i=0;i<posicion.length;i++){
			var tmpxx=parseInt(posicion[i].getAttribute("x"));
			var tmpyy=parseInt(posicion[i].getAttribute("y"));
			var edo=parseInt(posicion[i].getAttribute("f"));
			if(tmpxx==cx && tmpyy==cy && edo==2){ //existe una posibilidad de mov.
				return true; //se puede mover
			}
		}
		return false;
	}

	function clr(clrx,clry){
		for (i=0;i<posicion.length;i++){
			var tmpxx=parseInt(posicion[i].getAttribute("x"));
			var tmpyy=parseInt(posicion[i].getAttribute("y"));
			if(tmpxx==clrx && tmpyy==clry){ 
				var opclr=parseInt(posicion[i].getAttribute("f"));
				return opclr;
			}
		}
	}

//Cuadro1 (cuadro de coronación)
	c1.addEventListener("click",function(){
		if(c1.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p1");
			fturno();
		}
		else{
			dibuja=document.getElementById("p1");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				reinas();			
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c1.appendChild(div);
					c1.setAttribute("f","1");
					c1.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c1.appendChild(div);
					c1.setAttribute("f","0");
					c1.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c1.appendChild(div);
					c1.setAttribute("f","3");
					c1.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c1.appendChild(div);
					c1.setAttribute("f","4");
					c1.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}
					
	},false);

//Cuadro2 (cuadro de coronación)
	c2.addEventListener("click",function(){
		if(c2.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p2");
			fturno();
		}
		else{
			dibuja=document.getElementById("p2");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				reinas();			
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c2.appendChild(div);
					c2.setAttribute("f","1");
					c2.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c2.appendChild(div);
					c2.setAttribute("f","0");
					c2.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c2.appendChild(div);
					c2.setAttribute("f","3");
					c2.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c2.appendChild(div);
					c2.setAttribute("f","4");
					c2.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}
					
	},false);
//Cuadro3 (cuadro de coronacion)
	c3.addEventListener("click",function(){
		if(c3.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p3");
			fturno();
		}
		else{
			dibuja=document.getElementById("p3");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				reinas();			
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c3.appendChild(div);
					c3.setAttribute("f","1");
					c3.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();

				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c3.appendChild(div);
					c3.setAttribute("f","0");
					c3.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c3.appendChild(div);
					c3.setAttribute("f","3");
					c3.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c3.appendChild(div);
					c3.setAttribute("f","4");
					c3.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}
					
	},false);
//Cuadro4 (cuadro de coronación)
	c4.addEventListener("click",function(){
		if(c4.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p4");
			fturno();
		}
		else{
			dibuja=document.getElementById("p4");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				reinas();			
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c4.appendChild(div);
					c4.setAttribute("f","1");
					c4.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c4.appendChild(div);
					c4.setAttribute("f","0");
					c4.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c4.appendChild(div);
					c4.setAttribute("f","3");
					c4.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c4.appendChild(div);
					c4.setAttribute("f","4");
					c4.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}
					
	},false);
//Cuadro5
	c5.addEventListener("click",function(){
		if(c5.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p5");
			fturno();
		}
		else{
			dibuja=document.getElementById("p5");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c5.appendChild(div);
					c5.setAttribute("f","1");
					c5.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c5.appendChild(div);
					c5.setAttribute("f","0");
					c5.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c5.appendChild(div);
					c5.setAttribute("f","3");
					c5.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c5.appendChild(div);
					c5.setAttribute("f","4");
					c5.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}
	},false);
//Cuadro6
	c6.addEventListener("click",function(){
		if(c6.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p6");
			fturno();
		}
		else{
			dibuja=document.getElementById("p6");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c6.appendChild(div);
					c6.setAttribute("f","1");
					c6.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c6.appendChild(div);
					c6.setAttribute("f","0");
					c6.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();					
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c6.appendChild(div);
					c6.setAttribute("f","3");
					c6.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c6.appendChild(div);
					c6.setAttribute("f","4");
					c6.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}
	},false);
//Cuadro7
	c7.addEventListener("click",function(){
		if(c7.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p7");
			fturno();
		}
		else{
			dibuja=document.getElementById("p7");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c7.appendChild(div);
					c7.setAttribute("f","1");
					c7.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c7.appendChild(div);
					c7.setAttribute("f","0");
					c7.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c7.appendChild(div);
					c7.setAttribute("f","3");
					c7.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c7.appendChild(div);
					c7.setAttribute("f","4");
					c7.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}
	},false);
//Cuadro8
	c8.addEventListener("click",function(){
		if(c8.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p8");
			fturno();
		}
		else{
			dibuja=document.getElementById("p8");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c8.appendChild(div);
					c8.setAttribute("f","1");
					c8.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c8.appendChild(div);
					c8.setAttribute("f","0");
					c8.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c8.appendChild(div);
					c8.setAttribute("f","3");
					c8.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c8.appendChild(div);
					c8.setAttribute("f","4");
					c8.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro9
	c9.addEventListener("click",function(){
		if(c9.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p9");
			fturno();
		}
		else{
			dibuja=document.getElementById("p9");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c9.appendChild(div);
					c9.setAttribute("f","1");
					c9.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c9.appendChild(div);
					c9.setAttribute("f","0");
					c9.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c9.appendChild(div);
					c9.setAttribute("f","3");
					c9.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c9.appendChild(div);
					c9.setAttribute("f","4");
					c9.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro10
	c10.addEventListener("click",function(){		
		if(c10.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p10");
			fturno();
		}
		else{
			dibuja=document.getElementById("p10");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c10.appendChild(div);
					c10.setAttribute("f","1");
					c10.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c10.appendChild(div);
					c10.setAttribute("f","0");
					c10.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c10.appendChild(div);
					c10.setAttribute("f","3");
					c10.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c10.appendChild(div);
					c10.setAttribute("f","4");
					c10.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro11
	c11.addEventListener("click",function(){
		if(c11.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p11");
			fturno();
		}
		else{
			dibuja=document.getElementById("p11");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c11.appendChild(div);
					c11.setAttribute("f","1");
					c11.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c11.appendChild(div);
					c11.setAttribute("f","0");
					c11.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c11.appendChild(div);
					c11.setAttribute("f","3");
					c11.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c11.appendChild(div);
					c11.setAttribute("f","4");
					c11.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro12
	c12.addEventListener("click",function(){
		if(c12.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p12");
			fturno();
		}
		else{
			dibuja=document.getElementById("p12");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c12.appendChild(div);
					c12.setAttribute("f","1");
					c12.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c12.appendChild(div);
					c12.setAttribute("f","0");
					c12.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c12.appendChild(div);
					c12.setAttribute("f","3");
					c12.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c12.appendChild(div);
					c12.setAttribute("f","4");
					c12.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro13
	c13.addEventListener("click",function(){
		if(c13.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p13");
			fturno();
		}
		else{
			dibuja=document.getElementById("p13");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;		
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c13.appendChild(div);
					c13.setAttribute("f","1");
					c13.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c13.appendChild(div);
					c13.setAttribute("f","0");
					c13.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c13.appendChild(div);
					c13.setAttribute("f","3");
					c13.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c13.appendChild(div);
					c13.setAttribute("f","4");
					c13.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro14
	c14.addEventListener("click",function(){
		if(c14.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p14");
			fturno();
		}
		else{
			dibuja=document.getElementById("p14");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c14.appendChild(div);
					c14.setAttribute("f","1");
					c14.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c14.appendChild(div);
					c14.setAttribute("f","0");
					c14.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c14.appendChild(div);
					c14.setAttribute("f","3");
					c14.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c14.appendChild(div);
					c14.setAttribute("f","4");
					c14.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro15
	c15.addEventListener("click",function(){
		if(c15.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p15");
			fturno();
		}
		else{
			dibuja=document.getElementById("p15");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c15.appendChild(div);
					c15.setAttribute("f","1");
					c15.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c15.appendChild(div);
					c15.setAttribute("f","0");
					c15.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c15.appendChild(div);
					c15.setAttribute("f","3");
					c15.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c15.appendChild(div);
					c15.setAttribute("f","4");
					c15.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro16
	c16.addEventListener("click",function(){
		if(c16.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p16");
			fturno();
		}
		else{
			dibuja=document.getElementById("p16");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c16.appendChild(div);
					c16.setAttribute("f","1");
					c16.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c16.appendChild(div);
					c16.setAttribute("f","0");
					c16.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c16.appendChild(div);
					c16.setAttribute("f","3");
					c16.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c16.appendChild(div);
					c16.setAttribute("f","4");
					c16.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro17
	c17.addEventListener("click",function(){
		if(c17.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p17");
			fturno();
		}
		else{
			dibuja=document.getElementById("p17");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c17.appendChild(div);
					c17.setAttribute("f","1");
					c17.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c17.appendChild(div);
					c17.setAttribute("f","0");
					c17.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c17.appendChild(div);
					c17.setAttribute("f","3");
					c17.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c17.appendChild(div);
					c17.setAttribute("f","4");
					c17.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro18
	c18.addEventListener("click",function(){
		if(c18.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p18");
			fturno();
		}
		else{
			dibuja=document.getElementById("p18");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c18.appendChild(div);
					c18.setAttribute("f","1");
					c18.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c18.appendChild(div);
					c18.setAttribute("f","0");
					c18.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c18.appendChild(div);
					c18.setAttribute("f","3");
					c18.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c18.appendChild(div);
					c18.setAttribute("f","4");
					c18.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro19
	c19.addEventListener("click",function(){
		if(c19.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p19");
			fturno();
		}
		else{
			dibuja=document.getElementById("p19");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c19.appendChild(div);
					c19.setAttribute("f","1");
					c19.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c19.appendChild(div);
					c19.setAttribute("f","0");
					c19.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c19.appendChild(div);
					c19.setAttribute("f","3");
					c19.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c19.appendChild(div);
					c19.setAttribute("f","4");
					c19.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro20
	c20.addEventListener("click",function(){
		if(c20.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p20");
			fturno();
		}
		else{
			dibuja=document.getElementById("p20");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c20.appendChild(div);
					c20.setAttribute("f","1");
					c20.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c20.appendChild(div);
					c20.setAttribute("f","0");
					c20.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c20.appendChild(div);
					c20.setAttribute("f","3");
					c20.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c20.appendChild(div);
					c20.setAttribute("f","4");
					c20.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro21
	c21.addEventListener("click",function(){
		if(c21.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p21");
			fturno();
		}
		else{
			dibuja=document.getElementById("p21");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c21.appendChild(div);
					c21.setAttribute("f","1");
					c21.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c21.appendChild(div);
					c21.setAttribute("f","0");
					c21.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c21.appendChild(div);
					c21.setAttribute("f","3");
					c21.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c21.appendChild(div);
					c21.setAttribute("f","4");
					c21.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro22
	c22.addEventListener("click",function(){
		if(c22.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p22");
			fturno();
		}
		else{
			dibuja=document.getElementById("p22");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c22.appendChild(div);
					c22.setAttribute("f","1");
					c22.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c22.appendChild(div);
					c22.setAttribute("f","0");
					c22.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c22.appendChild(div);
					c22.setAttribute("f","3");
					c22.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c22.appendChild(div);
					c22.setAttribute("f","4");
					c22.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro23
	c23.addEventListener("click",function(){
		if(c23.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p23");
			fturno();
		}
		else{
			dibuja=document.getElementById("p23");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c23.appendChild(div);
					c23.setAttribute("f","1");
					c23.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c23.appendChild(div);
					c23.setAttribute("f","0");
					c23.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c23.appendChild(div);
					c23.setAttribute("f","3");
					c23.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c23.appendChild(div);
					c23.setAttribute("f","4");
					c23.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro24
	c24.addEventListener("click",function(){
		if(c24.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p24");
			fturno();
		}
		else{
			dibuja=document.getElementById("p24");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c24.appendChild(div);
					c24.setAttribute("f","1");
					c24.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c24.appendChild(div);
					c24.setAttribute("f","0");
					c24.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c24.appendChild(div);
					c24.setAttribute("f","3");
					c24.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c24.appendChild(div);
					c24.setAttribute("f","4");
					c24.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro25
	c25.addEventListener("click",function(){
		if(c25.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p25");
			fturno();
		}
		else{
			dibuja=document.getElementById("p25");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c25.appendChild(div);
					c25.setAttribute("f","1");
					c25.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c25.appendChild(div);
					c25.setAttribute("f","0");
					c25.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c25.appendChild(div);
					c25.setAttribute("f","3");
					c25.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c25.appendChild(div);
					c25.setAttribute("f","4");
					c25.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro26
	c26.addEventListener("click",function(){
		if(c26.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p26");
			fturno();
		}
		else{
			dibuja=document.getElementById("p26");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c26.appendChild(div);
					c26.setAttribute("f","1");
					c26.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c26.appendChild(div);
					c26.setAttribute("f","0");
					c26.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c26.appendChild(div);
					c26.setAttribute("f","3");
					c26.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c26.appendChild(div);
					c26.setAttribute("f","4");
					c26.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro27
	c27.addEventListener("click",function(){
		if(c27.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p27");
			fturno();
		}
		else{
			dibuja=document.getElementById("p27");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c27.appendChild(div);
					c27.setAttribute("f","1");
					c27.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c27.appendChild(div);
					c27.setAttribute("f","0");
					c27.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c27.appendChild(div);
					c27.setAttribute("f","3");
					c27.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c27.appendChild(div);
					c27.setAttribute("f","4");
					c27.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro28
	c28.addEventListener("click",function(){
		if(c28.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p28");
			fturno();
		}
		else{
			dibuja=document.getElementById("p28");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c28.appendChild(div);
					c28.setAttribute("f","1");
					c28.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c28.appendChild(div);
					c28.setAttribute("f","0");
					c28.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c28.appendChild(div);
					c28.setAttribute("f","3");
					c28.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c28.appendChild(div);
					c28.setAttribute("f","4");
					c28.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro29 (Cuadro de Coronación)
	c29.addEventListener("click",function(){
		if(c29.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p29");
			fturno();
		}
		else{
			dibuja=document.getElementById("p29");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				reinas()
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c29.appendChild(div);
					c29.setAttribute("f","1");
					c29.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c29.appendChild(div);
					c29.setAttribute("f","0");
					c29.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c29.appendChild(div);
					c29.setAttribute("f","3");
					c29.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c29.appendChild(div);
					c29.setAttribute("f","4");
					c29.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro30 (Cuadro de coronación)
	c30.addEventListener("click",function(){
		if(c30.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p30");
			fturno();
		}
		else{
			dibuja=document.getElementById("p30");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				reinas()
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c30.appendChild(div);
					c30.setAttribute("f","1");
					c30.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c30.appendChild(div);
					c30.setAttribute("f","0");
					c30.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c30.appendChild(div);
					c30.setAttribute("f","3");
					c30.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c30.appendChild(div);
					c30.setAttribute("f","4");
					c30.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro31 (Cuadro de coronación)
	c31.addEventListener("click",function(){
		if(c31.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p31");
			fturno();
		}
		else{
			dibuja=document.getElementById("p31");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				reinas()
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c31.appendChild(div);
					c31.setAttribute("f","1");
					c31.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c31.appendChild(div);
					c31.setAttribute("f","0");
					c31.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c31.appendChild(div);
					c31.setAttribute("f","3");
					c31.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c31.appendChild(div);
					c31.setAttribute("f","4");
					c31.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);
//Cuadro32 (Cuadro de coronación)
	c32.addEventListener("click",function(){
		if(c32.getAttribute("f")!=2 && activo>0){
			marca=document.getElementById("p32");
			fturno();
		}
		else{
			dibuja=document.getElementById("p32");
			if((salto()==true || movimiento()==true) && fturno()==true){
				turno=(turno==1)?0:1;
				reinas();
				if(marca.getAttribute("f")==1){
					var div=document.createElement("div");
					div.className="fichaN";				
					c32.appendChild(div);
					c32.setAttribute("f","1");
					c32.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				else if(marca.getAttribute("f")==0){
					var div=document.createElement("div");
					div.className="fichaB";				
					c32.appendChild(div);
					c32.setAttribute("f","0");
					c32.setAttribute("r","0");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las blancas
				else if(marca.getAttribute("f")==3){
					var div=document.createElement("div");
					div.className="reinaB";				
					c32.appendChild(div);
					c32.setAttribute("f","3");
					c32.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
				//reina de las negras
				else if(marca.getAttribute("f")==4){
					var div=document.createElement("div");
					div.className="reinaN";				
					c32.appendChild(div);
					c32.setAttribute("f","4");
					c32.setAttribute("r","1");
					marca.setAttribute("r","0");
					marca.setAttribute("f","2");
					marca.removeChild(marca.firstChild);
					ganar2();
				}
			}
		}	
	},false);	