function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileMenuBtn.setAttribute('aria-label', 'Закрыть меню');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-label', 'Открыть меню');
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-label', 'Открыть меню');
        });
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-label', 'Открыть меню');
        }
    });
}

// Функция для плавной прокрутки
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Функция для эффекта при прокрутке
function initScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (!header) return;
        
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Анимация появления элементов при скролле
        const animateElements = document.querySelectorAll('.program-card, .help-card, .news-card, .stat-item');
        
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Инициализация начального состояния для анимации
    const animateElements = document.querySelectorAll('.program-card, .help-card, .news-card, .stat-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Функция для обработки формы подписки
function initSubscribeForm() {
    const subscribeForm = document.getElementById('subscribeForm');
    
    if (!subscribeForm) return;
    
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Пожалуйста, введите email адрес');
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Пожалуйста, введите корректный email адрес');
            emailInput.focus();
            return;
        }
        
        // В реальном проекте здесь был бы AJAX-запрос к серверу
        // Для демонстрации просто показываем сообщение
        showNotification(`Спасибо за подписку! На адрес ${email} будут отправляться наши новости.`, 'success');
        
        // Сбрасываем форму
        this.reset();
    });
}

// Вспомогательная функция для проверки email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.backgroundColor = type === 'success' ? 'var(--primary-color)' : 'var(--accent-color)';
    notification.style.color = 'white';
    notification.style.boxShadow = 'var(--box-shadow)';
    notification.style.zIndex = '10000';
    notification.style.transition = 'all 0.3s ease';
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Автоматически скрываем через 5 секунд
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        // Удаляем из DOM после анимации
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    },