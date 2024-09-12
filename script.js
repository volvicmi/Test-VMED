window.addEventListener('load', function() {
	animateElements();
	// position centrée
	gsap.set(cible, {
		x: centerX,
		y: centerY
	});
});
  
  // Animation GSAP

let tl = gsap.timeline({
	delay: .5,
	repeat:-1, //-1,        
	repeatDelay: 1.5
  });

function animateElements() {
    tl.fromTo(".bgBull", { x: 0 }, { x: 300, duration: .8, ease: "elastic.out(.8, .7)" }, "0")
      .fromTo(".logoContainer", { y: 0 }, { y: 112, duration: 1, ease: "elastic.out(.4, .2)" }, "0")
	  .to(".logoBgCircle", { top: -469, width: 548, height: 548,  duration: 1, ease: "power3.inOut" }, "1")
	  .to(".logoContainer", { top: -110, height: 80,  duration: 1, ease: "power3.inOut" }, "1")
	  .to(".refContainer", { bottom: 0,  duration: .8, ease: "power3.inOut" }, "1")
	  .fromTo(".mainApp",{ opacity: .8 }, { opacity: 1, left: 0, duration: 1, ease: "power3.inOut" }, "1")
	  .to(".textContainer", { right: 100 + "%", duration: 1, ease: "power3.inOut" }, "5")
	  .fromTo(".gameContainer", 
		{ opacity: 0.8 }, 
		{ 
		  opacity: 1, 
		  left: 0, 
		  duration: 1, 
		  ease: "power3.inOut", 
		  onComplete: () => tl.pause()  // Mettre la timeline en pause après l'animation
		}, 
		"5")
	  .to(".gameContainer",{ opacity: .8, left: -100 + "%",  duration: 1, ease: "power3.inOut" }, "6")
			
	  .fromTo(".videoContainer",
		{ opacity: .8 }, 
		{
			opacity: 1, 
			left: 0,  
			duration: 1, 
			ease: "power3.inOut",
			onComplete: () => tl.pause()
		}, 
		"6")
		.to(".videoContainer",{ opacity: .8, left: -100 + "%", duration: 1, ease: "power3.inOut" }, "7")
		.fromTo(".lastText",{ opacity: .8 }, { opacity: 1, left: 0,  duration: 1, ease: "power3.inOut" }, "7")
}



// Popup 
const bannerHolder = document.querySelector('.bannerHolder');
const btnRef = document.querySelector('.btnRef');
const popup = document.querySelector('.popup');
const popupBg = document.querySelector('.popupBg');
const cross = document.querySelector('.cross');

btnRef.addEventListener('click', function() {
	console.log("je clique bien sur btnRef");
	// Ajout de la classe "popupActive" à l'élément bannerHolder
	bannerHolder.classList.add('popupActive');
	video.pause();  
	tl.pause();
});

popupBg.addEventListener('click', function() {
  	bannerHolder.classList.remove('popupActive');
	video.play();  
	setTimeout(() => {
		tl.resume(); 
	  }, 1000);
});

cross.addEventListener('click', function() {
	bannerHolder.classList.remove('popupActive');
	video.play();  
	setTimeout(() => {
		tl.resume();  
	  }, 1000);
});



// GAME
gsap.registerPlugin(Draggable);
// Rendre l'élément "#cible" draggable

// Sélectionner l'élément parent et la cible
const parent = document.querySelector(".parent");
const cible = document.querySelector("#cible");

// Obtenir les dimensions du parent et de la cible
const parentRect = parent.getBoundingClientRect();
const cibleRect = cible.getBoundingClientRect();

// Calculer la position pour centrer la cible dans le parent
const centerX = (parentRect.width - cibleRect.width) / 2;
const centerY = (parentRect.height - cibleRect.height) / 2;

// position centrée
gsap.set(cible, {
	x: centerX,
	y: centerY
});

Draggable.create("#cible", {
	type: "x,y",
	bounds: document.querySelector(".parent"),
	inertia: true,
	edgeResistance:.8,
	onDragEnd: function() {
		// Appel de la fonction de vérification de la collision à la fin du drag
		checkCollision();
	}
});

// Fonction pour vérifier la collision entre #cible et les éléments .child
function checkCollision() {
    var cible = document.querySelector("#cible");
    var childElements = document.querySelectorAll(".child");
    var cibleRect = cible.getBoundingClientRect();
	var childTarget =  document.querySelector(".child.true");

    // Vérification de chaque élément .child
    childElements.forEach(function(child) {
        var childRect = child.getBoundingClientRect();

        // Vérifier si la cible touche l'élément .child
        if (cibleRect.right > childRect.left &&
            cibleRect.left < childRect.right &&
            cibleRect.bottom > childRect.top &&
            cibleRect.top < childRect.bottom) 
        {
            // Collision détectée, rendre la cible sticky
            stickToChild(cible, child);

			var target = document.querySelectorAll(".target");
            // Si l'élément child a la classe "true", changer le fond de la cible en green
            if (child == childTarget) 
			{
                gsap.set("#cible svg path", {
					fill: '#1CC742',
					stroke:'#1CC742'
				});
				gsap.set("#cible svg circle", {
					stroke:'#1CC742'
				});
                console.log("Collision avec un personnage ayant la classe 'true'!");
				tl.resume();

				// recentrer la position de cible et réinitialiser les modifs
				setTimeout(() => {
					gsap.set(cible, {
						x: centerX,
						y: centerY
					});
					gsap.set("#cible svg path", { clearProps: "fill,stroke" });
					gsap.set("#cible svg circle", { clearProps: "stroke" });
				  }, 2000);
				
				if(target) target.forEach((e)=>e.remove());
            }
			else if(target.length == 0)
			{
				gsap.set("#cible svg path", {
					fill: '#FF8A00',
					stroke:'#FF8A00'
				});
				gsap.set("#cible svg circle", {
					stroke:'#FF8A00'
				});
				// Créer l'élément "target" si non présent
				var target = document.createElement("div");
				target.classList.add("target");
				childTarget.appendChild(target);
			} 

            if (!child.classList.contains("true")) console.log("La cible n'est pas sur un élément avec la classe 'true'.");
        }
    });

}



// Fonction pour rendre l'élément "cible" sticky sur l'élément "child" centré
function stickToChild(cible, child) {
    // Obtenir les positions de l'élément child
    var childRect = child.getBoundingClientRect();
    var parentRect = document.querySelector('.parent').getBoundingClientRect();

	console.log("childRect:");
	console.log(childRect);
	console.log("parentRect:");
	console.log(parentRect);

    // Calculer la position à laquelle la cible doit se coller au centre de l'élément child
    var x = childRect.left - parentRect.left + (childRect.width / 2) - (cible.offsetWidth / 2);
    var y = childRect.top - parentRect.top + (childRect.height / 2) - (cible.offsetHeight / 2);

	console.log("x:");
	console.log(x);
	console.log("y:");
	console.log(y);
    // Placement de la cible centrée sur l'élément child
    gsap.set(cible, {
        x: x,
        y: y
    });
}


const video = document.getElementById('video');

// Créer un observer pour surveiller l'élément vidéo
const observerVideo = new IntersectionObserver((entries, observerVideo) => {
  entries.forEach(entry => {
    // Vérifier si la vidéo est visible à l'écran
    if (entry.isIntersecting) {
      video.play();  
    } else {
      video.pause();  
    }
  });
}, { threshold: .8 }); // Seuil de visibilité 

observerVideo.observe(video);

video.addEventListener('ended', function() {
	tl.resume();  
});


const lastText = document.querySelector('.lastText');
const legend = document.querySelector('.legend');

const observerLastText = new IntersectionObserver((entries) => {
entries.forEach(entry => {
	if (entry.isIntersecting) {
	// Quand .lastText est visible, afficher .legend
	legend.style.opacity = '.9';
	} else {
	// Quand .lastText n'est plus visible, masquer .legend
	legend.style.opacity = '0';
	}
});
}, { threshold: .8}); // Seuil de visibilité (80%)

observerLastText.observe(lastText);
  



	