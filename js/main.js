const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);
	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		// переберем все свойства атрибутов и переносим на элемент
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}

	return element;
};

const createHeader = ({title, header: {logo, menu, social}}) => {

	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (logo) {
		const logoImg = getElement('img', ['logo'], {
			src: logo,
			alt: 'логотип ' + title,
		});

		wrapper.append(logoImg);
	}


	if (menu) {
		const nav = getElement('nav', ['menu-list']);
		const allMenuItems = menu.map(item => {
			const menuItem = getElement('a', ['menu-link'], {
				href: item.link,
				alt: item.title,
				textContent: item.title,
			});
			return menuItem;
		});

		nav.append(...allMenuItems);
		wrapper.append(nav);

		// бургер меню
		const menuButton = getElement('button', ['menu-button']);
		menuButton.addEventListener('click', () => {
			menuButton.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
			wrapper.classList.add('animated');
			wrapper.classList.toggle('fadeInRight');
		});
		container.append(menuButton);
		//
	}

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));

			socialLink.href = item.link;
			return socialLink;
		});

		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);


	return header;
};

const createMain = ({title, main: {genre, rating, description, trailer, slider}}) => {

	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const mainContent = getElement('div', ['main-content']);
	container.append(mainContent);
	const content = getElement('div', ['content']);
	mainContent.append(content);

	if (genre) {
		const genreSpan = getElement('span',
			['genre', 'animated', 'fadeInRight'],
			{textContent: genre});
		content.append(genreSpan);
	}

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'],
			{textContent: `${rating}/10`});

		ratingBlock.append(ratingStars, ratingNumber);

		// ставим количество звездочек соответствующее рейтингу, остальные пустые.
		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: i < rating ? './img/star.svg' : './img/star-o.svg',
			});
			ratingStars.append(star);
		}
		content.append(ratingBlock);
	}

	// добавляем Title
	content.append(getElement('h1',
		['main-title', 'animated', 'fadeInRight'],
		{textContent: title}),
	);

	if (description) {
		const descriptionBlock = getElement('p',
			['main-description', 'animated', 'fadeInRight'],
			{textContent: description},
		);
		content.append(descriptionBlock);
	}
	if (trailer) {
		const trailerLink = getElement('a',
			['button', 'animated', 'fadeInRight', 'youtube-modal'],
			{href: trailer, textContent: 'Смотреть трейлер'});
		const trailerImageLink = getElement('a',
			['play', 'youtube-modal'], {href: trailer, ariaLabel: 'Смотреть трейлер'});
		const iconPlay = getElement('img', ['play-img'],
			{src: "img/play.svg", alt: 'play', ariaHidden: true});

		content.append(trailerLink);

		trailerImageLink.append(iconPlay);
		mainContent.append(trailerImageLink);
	}

	if (slider) {
		const sliderSeriesBlock = getElement('div', ['series']);
		const swiperContainer = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);


		const slides = slider.map(item => {
			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: (item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle : ''),
			});
			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
				${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
				${item.title ? `<p class="card-title">${item.title}</p>` : ''}
				`;
				card.append(cardDescription);
			}
			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperContainer.append(swiperWrapper);
		sliderSeriesBlock.append(swiperContainer, arrow);
		container.append(sliderSeriesBlock);

		new Swiper(swiperContainer, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40,
				},
			},
		});

	}

	return main;
};

const createFooter = ({footer: {menu, copyright}}) => {
	const footer = getElement('footer', ['footer']);
	const container = getElement('div', ['container']);
	const footerContent = getElement('div', ['footer-content']);

	if (copyright) {
		const leftContent = getElement('div', ['left']);
		const span = getElement('span', ['copyright'], {textContent: copyright});
		leftContent.appendChild(span);
		footerContent.append(leftContent);
	}
	if (menu) {
		const rightContent = getElement('div', ['right']);
		const footerMenu = getElement('div', ['footer-menu']);
		const menuItems = menu.map(item => {
			return getElement('a', ['footer-link'], {
				href: item.link,
				textContent: item.title,
			});
		});
		footerMenu.append(...menuItems);
		rightContent.append(footerMenu);
		footerContent.append(rightContent);
	}
	container.append(footerContent);
	footer.append(container);
	return footer;
};

const moviesConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');
	// настраиваем цвета макета
	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';
	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	app.style.backgroundImage = options.background ? `url("${options.background}")` : '';

	if (options.favicon) {
		// определяем формат файла, чтобы изменить тип svg
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const favicon = getElement('link', [], {
			href: options.favicon,
			rel: "icon",
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
		});
		document.head.append(favicon);
	}

	document.title = options.title + ' - официальный сайт сериала';

	if (options.header) {
		app.append(createHeader(options));
	}
	if (options.main) {
		app.append(createMain(options));
	}
	if (options.footer) {
		app.append(createFooter(options));
	}
};


// запрос базы данных
const getData = async () => {
	const data = await fetch('data.json');
	if (data.ok) {
		return data.json();
	} else {
		throw new Error(`Данные не были получены. Ошибка ${data.status} ${data.statusText}`);
	}
};

getData().then(data => moviesConstructor('.app', data));



