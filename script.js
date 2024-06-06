document.addEventListener("DOMContentLoaded", async function() {
    await loadCollection(); // Ensuring the collection is loaded
    console.log("Collection Loaded");

    // Initially hide the grid and then animate it into view
    gsap.set(".nft-grid", { display: "none" });
    animateGrid();

    // Initialize lazy loading after the collection is loaded
    lazyLoadImages();
});

async function loadCollection() {
    const items = [];
    for (let i = 1; i <= 215; i++) {
        items.push({ name: `Cruno #${i}` });
    }

    const sortedItemsByName = items.sort((a, b) => {
        const numA = parseInt(a.name.replace(/^\D+/g, ''));
        const numB = parseInt(b.name.replace(/^\D+/g, ''));
        return numA - numB;
    });

    await displayCollectionItems(sortedItemsByName);
}

function animateGrid() {
    console.log(gsap);
    // Uncomment the GSAP animation block if needed
    // if (document.querySelector(".nft-grid")) {
    //     gsap.to(".nft-grid", {
    //         duration: 1.5,
    //         display: "block",
    //         y: -100,
    //         opacity: 1,
    //         ease: "power3.out"
    //     });
    // } else {
    //     console.warn("GSAP animation target .nft-grid not found.");
    // }
}

function displayCollectionItems(items) {
    const nftGrid = document.getElementById('nft-grid');
    items.forEach(item => {
        const imagePath = `thumbs/${encodeURIComponent(item.name)}.png`;
        const nftCard = createNFTCard(item, imagePath);
        nftGrid.appendChild(nftCard);
    });
}

function createNFTCard(item, thumbnailPath) {
    const nftCard = document.createElement('div');
    nftCard.className = 'nft-card';
    nftCard.style.width = 'calc(100% - 10px)';
    nftCard.style.height = 'auto';
    nftCard.style.flex = '1 0 auto';
    nftCard.style.display = 'flex';
    nftCard.style.flexDirection = 'column';
    nftCard.style.alignItems = 'flex-start';
    nftCard.style.padding = '5px';
    nftCard.style.gap = '10px';
    nftCard.style.background = '';
    nftCard.style.borderRadius = '7px';
    nftCard.style.boxSizing = 'border-box';

    const imageContainer = document.createElement('div');
    imageContainer.style.display = 'flex';
    imageContainer.style.alignItems = 'center';
    imageContainer.style.justifyContent = 'center';
    imageContainer.style.width = '100%';
    imageContainer.style.paddingTop = '150px';
    imageContainer.style.position = 'relative';
    imageContainer.style.background = '#192C27';
    imageContainer.style.borderRadius = '7px';

    const img = document.createElement('img');
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.height = '150px';
    img.style.borderRadius = '7px 7px 0px 0px';
    img.src = thumbnailPath;
    img.alt = item.name;

    const content = document.createElement('div');
    content.style.maxWidth = '110px';
    content.className = 'content';
    content.style.width = '120px';
    content.style.flexGrow = '1';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'flex-start';
    content.style.background = '';
    content.style.color = '#000000';

    const title = document.createElement('div');
    title.textContent = item.name;
    title.style.fontFamily = 'Spline Sans, sans-serif';
    title.style.fontSize = '12px';
    title.style.lineHeight = '143%';
    title.style.textTransform = 'uppercase';
    title.style.color = '#000000';

    imageContainer.appendChild(img);
    nftCard.appendChild(imageContainer);
    content.appendChild(title);
    nftCard.appendChild(content);

    gsap.set(nftCard, { opacity: 0.4 });

    nftCard.addEventListener('mouseover', function() {
        gsap.to(nftCard, { opacity: 1, duration: 0.3 });
    });

    nftCard.addEventListener('mouseout', function() {
        gsap.to(nftCard, { opacity: 0.4, duration: 0.3 });
    });

    return nftCard;
}

function lazyLoadImages() {
    // Lazy loading logic remains unchanged
}

console.log(gsap);
gsap.registerPlugin(Flip);

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const nftGrid = document.getElementById('nft-grid');
    const noResults = document.getElementById('no-results');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim();
        const searchNumber = parseInt(searchTerm, 10);
        const cards = document.querySelectorAll('.nft-card');
        let matchFound = false;

        // Prevent input of numbers greater than 222
        if (!isNaN(searchNumber) && (searchNumber < 1 || searchNumber > 215)) {
            searchInput.value = '';
            return;
        }

        cards.forEach(card => {
            gsap.set(card, { opacity: 0.4 });
        });

        if (searchTerm !== '') {
            if (!isNaN(searchNumber)) {
                cards.forEach(card => {
                    const editionNumber = parseInt(card.querySelector('.content div').textContent.replace(/^\D+/g, ''), 10);
                    if (editionNumber === searchNumber) {
                        gsap.set(card, { opacity: 1 });
                        nftGrid.prepend(card);
                        matchFound = true;
                    }
                });
            }
        }

        if (matchFound) {
            noResults.style.display = 'none';
        } else {
            if (searchTerm !== '') {
                noResults.style.display = 'block';
                cards.forEach(card => {
                    gsap.set(card, { opacity: 0 });
                });
            } else {
                noResults.style.display = 'none';
                cards.forEach(card => {
                    gsap.set(card, { opacity: 0.4 });
                });
            }
        }
    });
});
