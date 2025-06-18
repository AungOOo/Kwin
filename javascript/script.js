// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle handle position
    const toggleHandle = document.querySelector('.toggle-handle');
    if (newTheme === 'dark') {
        toggleHandle.style.left = '33px';
        toggleHandle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        toggleHandle.style.left = '3px';
        toggleHandle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const toggleHandle = document.querySelector('.toggle-handle');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Set initial toggle position
        if (savedTheme === 'dark') {
            if (toggleHandle) {
                toggleHandle.style.left = '33px';
                toggleHandle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }
    
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === 'index.html') ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Home page specific functionality
    const sliderContainer = document.querySelector('.hero-slider');

    if (sliderContainer) {
        const slides = sliderContainer.querySelectorAll('.slide');
        const dots = sliderContainer.querySelectorAll('.slider-dot');
        const prevBtn = sliderContainer.querySelector('.slider-prev');
        const nextBtn = sliderContainer.querySelector('.slider-next');

        if (slides.length && dots.length) {
            let currentSlide = 0;

            function showSlide(n) {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));

                currentSlide = (n + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }

            function changeSlide(n) {
                showSlide(currentSlide + n);
            }

            function goToSlide(n) {
                showSlide(n);
            }

            if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
            if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => goToSlide(index));
            });

            setInterval(() => changeSlide(1), 5000);

            // Initialize first slide
                showSlide(0);
            } else {
                console.warn('Slides or dots not found inside hero-slider.');
            }
        } else {
        console.warn('Hero slider container not found.');
    }

    // Donation page specific functionality
    if (document.querySelector('.donation-option')) {
        // Initialize donation option selection
        const donationOptions = document.querySelectorAll('.donation-option');
        donationOptions.forEach(option => {
            option.addEventListener('click', function() {
                donationOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    // Contact form functionality
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Story detail page functionality
    if (document.getElementById('detail-title')) {
        // Get story ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const storyId = urlParams.get('id');
        
        // Load story if ID is valid
        if (storyId && storyId >= 1 && storyId <= 6) {
            loadStory(storyId);
        } else {
            // Redirect to stories page if invalid ID
            window.location.href = 'stories.html';
        }
    }
    
    // Initialize animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements that should animate when scrolled to
    document.querySelectorAll('.focus-card, .stat-card, .value-card, .story-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Scroll to top functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300 && scrollTopBtn) {
            scrollTopBtn.classList.add('visible');
        } else if (scrollTopBtn) {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Story detail loading function
function loadStory(storyId) {
    const stories = [
        {
            title: "New School Brings Hope to Mountain Village",
            location: "Vietnam",
            date: "June 15, 2023",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            body: `
                <p>In the remote mountains of Northern Vietnam, children in the Hmong village of Sapa faced a daily challenge - a 10km walk to the nearest school. Many children, especially girls, were unable to attend regularly due to the difficult terrain and harsh weather conditions.</p>
                
                <p>With the support of SEA Community donors, we built a community learning center right in the heart of the village. The new facility includes three classrooms, a library, and computer lab powered by solar panels. Local craftsmen were employed to construct the building using sustainable materials, creating jobs while building a future for their children.</p>
                
                <p>"My daughter can now attend school every day," says Mai, a mother of three. "Before, she could only go twice a week because the walk was too difficult. Now she's learning to read and write, and she dreams of becoming a teacher."</p>
                
                <p>The school has also become a community hub where adults attend evening literacy classes and vocational training. Within six months of opening, school attendance increased by 75%, with girls making up 55% of the student body.</p>
                
                <p>This project is part of our Mountain Education Initiative, which aims to build 20 community schools across Vietnam's remote highlands by 2025.</p>
            `
        },
        {
            title: "Clean Water Transforms Community Health",
            location: "Cambodia",
            date: "April 3, 2023",
            image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            body: `
                <p>In rural Cambodia, access to clean water was a daily struggle for the villagers of Preah Vihear. Contaminated water sources led to frequent outbreaks of waterborne diseases, with children being particularly vulnerable.</p>
                
                <p>Our team implemented a comprehensive water filtration system that now provides clean drinking water to over 500 families. The system includes 15 community wells with advanced filtration technology, rainwater harvesting systems, and hygiene education programs.</p>
                
                <p>"Before the project, my children were often sick with diarrhea," shares Sokha, a mother of four. "We spent so much money on medicine and missed many work days. Now we have clean water right in our village, and my children haven't been sick since."</p>
                
                <p>The results have been remarkable:
                <ul>
                    <li>Waterborne diseases reduced by 80%</li>
                    <li>School attendance increased by 45%</li>
                    <li>Women save 3 hours daily previously spent fetching water</li>
                    <li>Community garden established using collected rainwater</li>
                </ul>
                </p>
                
                <p>Local villagers were trained to maintain the filtration systems, creating sustainable employment. The project has become a model for other communities in the region, with five neighboring villages now implementing similar systems.</p>
            `
        },
        {
            title: "Fisherwomen Build Sustainable Businesses",
            location: "Philippines",
            date: "March 22, 2023",
            image: "https://images.unsplash.com/photo-1576675466969-38eeae4b41d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            body: `
                <p>In the coastal region of Palawan, Philippines, women have traditionally played a vital but unrecognized role in the fishing industry. With our support, these women are now becoming successful entrepreneurs.</p>
                
                <p>Our Women's Economic Empowerment Program provided micro-loans, business training, and market access to 120 women from fishing communities. Participants formed cooperatives to process and market their seafood products directly to buyers, bypassing exploitative middlemen.</p>
                
                <p>Maria, a program participant, shares: "Before, we sold our catch to traders at very low prices. Now, with our cooperative, we process the fish into value-added products and sell directly to hotels and restaurants. My income has tripled, and I can now send my children to college."</p>
                
                <p>The program has achieved impressive results:
                <ul>
                    <li>Average household income increased by 220%</li>
                    <li>Created 85 new sustainable businesses</li>
                    <li>Established 8 women-led fishing cooperatives</li>
                    <li>Reduced post-harvest losses by 60% through proper processing</li>
                </ul>
                </p>
                
                <p>Beyond economic benefits, the program has empowered women to take leadership roles in their communities. Several participants have been elected to local government positions, advocating for sustainable fishing practices and women's rights.</p>
            `
        },
        {
            title: "Digital Literacy Opens New Opportunities",
            location: "Indonesia",
            date: "February 18, 2023",
            image: "https://images.unsplash.com/photo-1581578021014-7c35c3d0e0c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            body: `
                <p>In rural Indonesia, limited access to technology and digital skills has created a significant barrier to economic opportunities. Our Digital Literacy Program is changing that reality for young people in remote villages.</p>
                
                <p>We established community tech hubs in 12 villages across Java and Sumatra, equipped with computers, high-speed internet, and training facilities. Over 600 young people have completed our intensive 3-month training program, learning essential digital skills including coding, digital marketing, and remote work tools.</p>
                
                <p>Rudi, a 22-year-old graduate from West Java, shares his experience: "Before the training, I had never used a computer. Now I work as a freelance graphic designer for clients around the world. I can support my family without leaving my village."</p>
                
                <p>The program's impact includes:
                <ul>
                    <li>85% of graduates secured remote employment within 3 months</li>
                    <li>Average income increased by 300% for program graduates</li>
                    <li>Established 5 youth-led digital service startups</li>
                    <li>Created a network of digital mentors across villages</li>
                </ul>
                </p>
                
                <p>Our next phase will expand to 30 additional villages and include advanced training in artificial intelligence and blockchain technologies, ensuring rural youth remain competitive in the global digital economy.</p>
            `
        },
        {
            title: "Organic Farming Revives Community",
            location: "Thailand",
            date: "January 5, 2023",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            body: `
                <p>In Northern Thailand, traditional farming communities were struggling with declining yields, soil degradation, and dependence on expensive chemical inputs. Our Sustainable Agriculture Initiative is helping farmers transition to organic practices that restore the land while increasing profits.</p>
                
                <p>We partnered with local agricultural experts to establish demonstration farms and training centers. Farmers learn techniques including crop rotation, natural pest management, composting, and water conservation. The program also helps farmers obtain organic certification and connects them with premium markets.</p>
                
                <p>Chai, a rice farmer from Chiang Mai province, explains: "After switching to organic methods, my production costs decreased by 60% and my rice now sells for three times the price. The soil is healthier, and I no longer worry about chemical exposure for my family."</p>
                
                <p>The program's success is evident:
                <ul>
                    <li>500+ farmers transitioned to organic practices</li>
                    <li>Average farm income increased by 180%</li>
                    <li>Soil health improved by 40% across participating farms</li>
                    <li>Established 12 farmer cooperatives for collective marketing</li>
                </ul>
                </p>
                
                <p>Beyond economic benefits, the initiative has strengthened community bonds as farmers share knowledge and resources. The program has also revived traditional farming knowledge that was in danger of being lost.</p>
            `
        },
        {
            title: "Healthcare Access for Ethnic Minorities",
            location: "Vietnam",
            date: "November 20, 2022",
            image: "https://images.unsplash.com/photo-1582212172611-6d3d1c94f3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            body: `
                <p>Ethnic minority communities in Vietnam's Central Highlands face significant barriers to healthcare access, including geographic isolation, language differences, and cultural barriers. Our Mobile Health Initiative is bringing essential healthcare services directly to these remote communities.</p>
                
                <p>We established a fleet of mobile clinics staffed by healthcare professionals who speak local languages and understand cultural practices. Each clinic is equipped for basic medical care, vaccinations, maternal health services, and health education. We've also trained over 100 community health workers from local villages to provide ongoing support.</p>
                
                <p>Linh, a nurse practitioner on our mobile team, shares: "Before we started, many women gave birth without any medical assistance. Now we have prenatal care programs and safe delivery support. Infant mortality has decreased by 65% in the communities we serve."</p>
                
                <p>The initiative has achieved remarkable outcomes:
                <ul>
                    <li>Established 8 mobile clinic routes serving 35 villages</li>
                    <li>Provided healthcare access to 15,000+ previously underserved people</li>
                    <li>Vaccination rates increased from 30% to 95%</li>
                    <li>Maternal mortality decreased by 80%</li>
                </ul>
                </p>
                
                <p>Our next phase includes telemedicine capabilities to connect remote communities with specialists in urban centers, and expansion to additional ethnic minority regions across Southeast Asia.</p>
            `
        }
    ];
    
    // Set story details
    const story = stories[storyId - 1];
    document.getElementById('detail-title').textContent = story.title;
    document.getElementById('detail-location').textContent = story.location;
    document.getElementById('detail-date').textContent = story.date;
    document.getElementById('detail-image').style.backgroundImage = `url('${story.image}')`;
    document.getElementById('detail-body').innerHTML = story.body;
}
