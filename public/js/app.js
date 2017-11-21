class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header/>
                <Home/>
            </div>
           );
    }
}

class Header extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <header>
                <div className="menu_block">
                    <div className="container clearfix">
                        <div className="logo pull-left">
                            <a href="index.html" ><span className="b1">w</span><span className="b2">h</span><span className="b3">i</span><span className="b4">t</span><span className="b5">e</span> <span className="b4">box</span></a>
                        </div>
                    </div>
                </div>
            </header>
            );
    }
}

class Home extends React.Component {

    constructor() {
        super();
        this.activateSlide = this.activateSlide.bind(this);
        this.state = { selectSlide: "slide1" };
    }

    activateSlide(cible) {
        this.setState({
            // le activeSlide est celui cliqué (renvoyé par la fonction handleClick de CarouselSlide)
            selectSlide:cible
        });
    }

    render() {
        // App va retourner la "balise" <ListeBurger/>
        return (
            <section id="home" className="padbot0">
                <Slider slideActif={this.state.selectSlide}  />
                <Carousel handleSlideActive={this.activateSlide} />
            </section>
            );
    }
}

class Slider extends React.Component {

    constructor() {
        super();
    }

    render() {

        const captionDatas = [
        {liClass:"slide1", classPar1: "title1 captionDelay2 FromTop", classPar2:"title2 captionDelay4 FromTop", classPar3:"title3 captionDelay6 FromTop", classPar4:"title4 captionDelay7 FromTop", city: "Lyon", title:"vacances été", year: "2017" , desc: "Vacances au calme dans une petite maison de campagne" },
        {liClass:"slide2", classPar1: "title1 captionDelay6 FromLeft", classPar2:"title2 captionDelay4 FromLeft", classPar3:"title3 captionDelay2 FromLeft", classPar4:"title4 captionDelay7 FromLeft", city: "Sarcelles", title:"weekend de mai", year: "2016" , desc: "Un moment de detente en famille" },
        {liClass:"slide3", classPar1: "title1 captionDelay1 FromBottom", classPar2:"title2 captionDelay2 FromBottom", classPar3:"title3 captionDelay3 FromBottom", classPar4:"title4 captionDelay5 FromBottom", city: "Biarritz", title:"Anniversaire Allan", year: "2016" , desc: "Surf and fun entre amis" }
        ];

        let slides = [];
        for (var i = 0; i < captionDatas.length; i++) {
            if (captionDatas[i].liClass == this.props.slideActif) {
                captionDatas[i].liClass = captionDatas[i].liClass + " flex-active-slide";
            }

            slides.push(
                    <Slide
                        key={i}
                        liClass={captionDatas[i].liClass}
                        classPar1={captionDatas[i].classPar1}
                        classPar2={captionDatas[i].classPar2}
                        classPar3={captionDatas[i].classPar3}
                        classPar4={captionDatas[i].classPar4}
                        city={captionDatas[i].city}
                        year={captionDatas[i].year}
                        title={captionDatas[i].title}
                        desc={captionDatas[i].desc}
                    />);

        }

        return (
         <div className="flexslider top_slider">
            <ul className="slides">
                {slides}
            </ul>
         </div>
         );
    }
}

class Slide extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <li className={this.props.liClass}>
            <div className="flex_caption1">
            <p className={this.props.classPar1}>{this.props.city}</p>
            <p className={this.props.classPar2}>{this.props.title}</p>
            <p className={this.props.classPar3}>{this.props.year}</p>
            <p className={this.props.classPar4}>{this.props.desc}</p>
            </div>
            </li>
            );
    }
}

class Carousel extends React.Component {

    constructor() {
        super();
        this.checkActiveCarouselSlide = this.checkActiveCarouselSlide.bind(this);
        // par défaut le activeSlide est celui qui a la data-target "slide1"
        this.state = { activeSlide: "slide1" };
    }


    checkActiveCarouselSlide(clickedSlide) {
        //console.log("le slide activé est " + clickedSlide);
        this.setState({
            // le activeSlide est celui cliqué (renvoyé par la fonction handleClick de CarouselSlide)
            activeSlide:clickedSlide
        });
        this.props.handleSlideActive(clickedSlide);
    }


    render() {
       const carouselDatas = [
       { target:"slide1", image: "images/slider/slide1_bg.jpg"},
       { target:"slide2", image: "images/slider/slide2_bg.jpg"},
       { target:"slide3", image: "images/slider/slide3_bg.jpg"},
       ];

       let carouselList = [];

       for (var i = 0; i < carouselDatas.length; i++) {
        var className;
        // si la propriété target correspond, la propriété "classN" prend la valeur "flex-active-slide"
        if (carouselDatas[i].target == this.state.activeSlide) {
            className = "flex-active-slide";
        } else {
            className = "";
        }
            carouselList.push(
            <CarouselSlide
                handleCarouselActive={this.checkActiveCarouselSlide}
                key={i} target={carouselDatas[i].target}
                image={carouselDatas[i].image}
                classN={className}
            />);

    }

    return (
        <div id="carousel">
        <ul className="slides">
        {carouselList}
        </ul>
        </div>
        );
    }
}

class CarouselSlide extends React.Component {

    constructor() {
        super();
        //Toujours "binder" la fonction de l'événement :  ici le this fait référence à CarouselSlide, le bind sert a indiquer la valeur du this
        this.handleClick = this.handleClick.bind(this);
   }


   handleClick() {
    // on evoie à la propriété "handleCarouselActive" du parent la "data-target" du li cliqué
    this.props.handleCarouselActive(this.props.target);
  }


  render() {


    return (
        <li
        onClick={this.handleClick}
        data-target={this.props.target}
        className={this.props.classN}>
        <img src={this.props.image} alt="" />
        </li>
        );
    }
}


ReactDOM.render(
 <App/>
 ,
 document.getElementById('page')
 );
