/*new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});*/

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

	// бургер меню
	const menuButton = getElement('button', ['menu-button']);
	menuButton.addEventListener('click', function () {
		menuButton.classList.toggle('menu-button-active');
		wrapper.classList.toggle('header-active');
		wrapper.classList.add('animated');
		wrapper.classList.toggle('fadeInRight');
	});
	//

	header.append(container);
	container.append(wrapper);
	container.append(menuButton);


	return header;
};

const createMain = ({title, main: {genre, rating, description, trailer}}) => {

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

	return main;
};

const moviesConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');
	app.style.backgroundImage = options.background ? `url("${options.background}")` : '';

	const favicon = getElement('link', [], {href: "witcher/logo.png", rel: "icon"});
	document.head.append(favicon);

	document.title = options.title + ' - официальный сайт сериала';

	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}
};


moviesConstructor('.app', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com',
				image: 'witcher/social/twitter.svg',
			},
			{
				title: 'Instagram',
				link: 'https://instagram.com',
				image: 'witcher/social/instagram.svg',
			},
			{
				title: 'Facebook',
				link: 'https://www.facebook.com',
				image: 'witcher/social/facebook.svg',
			},
		],
		menu: [
			{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Отзывы',
				link: '#',
			},
		],
	},
	main: {
		genre: '2019,фэнтези',
		rating: '8',
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
	},
});
