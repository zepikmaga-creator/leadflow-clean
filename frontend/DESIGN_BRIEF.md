# LeadFlowClean Design Brief

## Главная цель

Переделать дизайн LeadFlowClean, ориентируясь в первую очередь на референсы из Google Stitch.

Референсы находятся в:

frontend/references/

Они важнее любых общих SaaS-идей. Нужно максимально сохранить направление, настроение и визуальный язык из этих референсов, но не копировать код 1 в 1.

---

## Основной стиль

Проект должен выглядеть как современная платформа для клинингового сервиса:

- чистый светлый интерфейс
- мягкий голубой / blue-tint фон
- много воздуха
- аккуратные карточки
- спокойные цвета
- премиальный, но простой визуал
- минимум визуального шума
- понятная структура
- дизайн должен выглядеть как реальный коммерческий сайт

---

## Главные референсы Google Stitch

Использовать как основу:

1. leadflow_landing_page_updated
   - главный лендинг
   - hero section
   - карточки преимуществ
   - форма заявки
   - блок с фото/иллюстрациями

2. our_services
   - карточки услуг
   - блок cleaning checklist
   - форма custom quote
   - footer

3. admin_dashboard_leads_updated
   - стиль админки
   - боковое меню
   - dashboard cards
   - таблица заявок
   - search/filter
   - статусные бейджи

4. lead_details_view
   - карточка детальной заявки
   - customer contact
   - cleaning scope
   - request schedule
   - activity log

---

## Цветовая палитра

Ориентироваться на референсы:

- background: очень светлый голубой / blue-gray
- cards: white
- primary: глубокий синий
- secondary: soft teal / mint
- accent: мягкий зелёный для CTA
- text: dark blue-gray
- muted text: gray-blue
- borders: light blue-gray
- danger: мягкий red только для удаления/ошибок

Избегать:
- кислотных цветов
- тяжёлых градиентов
- тёмных фонов
- ярко-фиолетового SaaS-стиля

---

## Лендинг

Главная страница должна быть похожа на cleaning service landing page из Stitch.

Структура:

1. Header
   - logo LeadFlow
   - navigation: Home, Services, Pricing, About, Contact
   - кнопка: Book Now / Get Started

2. Hero section
   - большой заголовок
   - короткое описание
   - CTA кнопки
   - визуальный блок справа: карточки/изображения/cleaning preview

3. Benefits
   - 3 карточки преимуществ
   - Fully Insured Pros
   - Eco-Friendly First
   - Seamless Scheduling

4. Services preview
   - Residential Cleaning
   - Commercial
   - Move-In / Move-Out
   - Post-Construction

5. Lead form
   - форма должна выглядеть как premium quote form
   - поля аккуратные, с хорошими отступами
   - CTA: Get Instant Pricing / Request a Quote

6. Footer
   - спокойный минимальный footer

---

## Форма заявки

Форма должна быть визуально важной частью страницы.

Поля:

- name
- phone
- service
- preferredDate
- comment

Требования:

- крупная белая карточка
- мягкая тень
- rounded corners
- аккуратные labels
- понятные validation states
- CTA-кнопка в стиле Stitch
- после отправки показать приятный success state

---

## Админка

Админка должна ориентироваться на admin_dashboard_leads_updated.

Требования:

1. Layout
   - sidebar слева
   - main content справа
   - светлый голубой фон
   - белые карточки

2. Sidebar
   - logo LeadFlow Admin
   - menu items:
     - Dashboard
     - Leads
     - Services
     - Settings
   - активный пункт подсвечен мягким teal/blue

3. Dashboard
   - карточки статистики:
     - Total leads
     - New
     - Contacted
     - Done
   - search bar
   - status filter
   - export CSV button

4. Leads list
   - таблица или аккуратные карточки
   - имя клиента
   - телефон
   - услуга
   - дата
   - статус
   - действия

5. Status badges
   - New
   - Contacted
   - Done
   - мягкие цвета, как в Stitch

---

## Детальная карточка заявки

Если есть возможность без сильного усложнения, добавить view/edit lead details.

Ориентир: lead_details_view.

В карточке заявки показать:

- имя клиента
- телефон
- услуга
- preferred date
- comment
- status
- createdAt
- кнопки смены статуса

---

## Что не делать

- Не менять backend без необходимости
- Не ломать существующую логику
- Не добавлять сложные библиотеки без нужды
- Не использовать тёмную тему
- Не делать дизайн слишком “игрушечным”
- Не делать кислотные градиенты
- Не копировать Stitch HTML напрямую, а адаптировать стиль под текущий React-проект

---

## Проверка результата

После редизайна обязательно:

1. npm run build во frontend
2. Проверить /
3. Проверить /admin
4. Проверить login в админку
5. Проверить форму заявки
6. Проверить список заявок
7. Проверить смену статуса
8. Проверить export CSV
9. Проверить мобильную версию