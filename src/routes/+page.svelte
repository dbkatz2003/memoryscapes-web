<script lang="ts">
  import { onMount } from 'svelte';
  
  let scrollY = $state(0);
  let email = $state('');
  let isSubmitting = $state(false);
  let submitMessage = $state('');
  let submitError = $state('');

  const API_ENDPOINT = import.meta.env.VITE_EMAIL_API_ENDPOINT || '';

  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      submitError = 'Please enter a valid email address';
      return;
    }

    isSubmitting = true;
    submitError = '';
    submitMessage = '';

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        submitMessage = data.message || 'Successfully joined the waitlist!';
        email = '';
      } else {
        submitError = data.error || 'Something went wrong. Please try again.';
      }
    } catch (error) {
      submitError = 'Network error. Please check your connection and try again.';
      console.error('Submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }

  onMount(() => {
    // Horizontal scroll effect
    const wrapper = document.querySelector('.horizontal-scroll-wrapper') as HTMLElement;
    const container = document.querySelector('.horizontal-scroll-container') as HTMLElement;
    
    // Parallax background elements
    const gradientMesh = document.querySelector('.gradient-mesh') as HTMLElement;
    const orbs = document.querySelectorAll('.floating-orb') as NodeListOf<HTMLElement>;
    
    if (wrapper && container) {
      const handleScroll = () => {
        const wrapperTop = wrapper.offsetTop;
        const wrapperHeight = wrapper.offsetHeight;
        const scrollPosition = window.scrollY - wrapperTop;
        
        // Horizontal scroll effect
        if (scrollPosition >= 0 && scrollPosition <= wrapperHeight - window.innerHeight) {
          const scrollPercentage = scrollPosition / (wrapperHeight - window.innerHeight);
          const maxScroll = container.scrollWidth - window.innerWidth;
          container.style.transform = `translateX(-${scrollPercentage * maxScroll}px)`;
        }
        
        // Parallax effect on background with horizontal gradient sliding
        const scrollY = window.scrollY;
        const scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        if (gradientMesh) {
          // Slide gradient from left to right based on scroll position
          const translateX = scrollProgress * 100; // 0% to 100% as you scroll
          gradientMesh.style.transform = `translateX(${translateX}%)`;
        }
        
        orbs.forEach((orb, index) => {
          const speed = 0.1 + (index * 0.05);
          const direction = index % 2 === 0 ? 1 : -1;
          orb.style.transform = `translate(${scrollY * speed * direction}px, ${scrollY * speed * 0.5}px)`;
        });
      };
      
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  });
</script>

<svelte:window bind:scrollY />

<!-- Dynamic Background -->
<div class="dynamic-background">
  <div class="gradient-mesh"></div>
  <div class="floating-orb orb-1"></div>
  <div class="floating-orb orb-2"></div>
  <div class="floating-orb orb-3"></div>
  <div class="grain-overlay"></div>
</div>

<!-- Color Stripe Header -->
<div class="fixed top-0 left-0 right-0 h-2 flex z-50">
  <div class="flex-1" style="background-color: var(--color-memory-blue)"></div>
  <div class="flex-1" style="background-color: var(--color-memory-purple)"></div>
  <div class="flex-1" style="background-color: var(--color-memory-lavender)"></div>
  <div class="flex-1" style="background-color: var(--color-memory-magenta)"></div>
</div>

<!-- Navigation -->
<nav class="fixed top-2 left-0 right-0 z-40 backdrop-blur-sm" style="background-color: rgba(10, 10, 10, 0.8);">
  <div class="max-w-7xl mx-auto px-6 py-4">
    <img 
      src="/memoryscapes_title.png" 
      alt="memoryscapes" 
      class="h-12 md:h-16"
    />
  </div>
</nav>

<!-- Hero Section -->
<section class="min-h-screen flex items-center justify-center px-6 pt-24 opacity-0 animate-fade-in">
  <div class="max-w-5xl text-center">
    <h1 class="text-6xl md:text-7xl lg:text-8xl font-light mb-12 leading-tight" style="color: var(--color-memory-blue)">
      <img 
        src="/memoryscapes_title.png" 
        alt="memoryscapes" 
        class="inline-block h-16 md:h-20 lg:h-24 align-middle mx-2 opacity-0 animate-scale-in"
        style="animation-delay: 0.3s;"
      /> is a protected environment where you own and control everything you share and create.
    </h1>
    <p class="text-2xl md:text-3xl mb-8 opacity-0 animate-slide-in" style="color: rgba(255, 255, 255, 0.7); animation-delay: 0.6s;">
      You are many people in your little Memoryscapes bubble. Hold on to it and let it grow.
    </p>
  </div>
</section>

<!-- Horizontal Scroll Container -->
<div class="horizontal-scroll-wrapper">
  <div class="horizontal-scroll-container">
    <!-- PROTECT Section -->
    <section id="protect" class="horizontal-section">
      <div class="section-content">
        <div class="section-card" style="background: linear-gradient(135deg, var(--color-memory-blue) 0%, #0052CC 100%);">
          <h2 class="text-7xl md:text-8xl font-bold mb-8 opacity-0 animate-fade-in" style="animation-delay: 0.2s;">PROTECT</h2>
          <p class="text-white/90 text-2xl md:text-3xl leading-relaxed opacity-0 animate-slide-in" style="animation-delay: 0.4s;">
            Own your data completely, protected from the risks of a world where what you 
            share can be used against you.
          </p>
        </div>
      </div>
    </section>

    <!-- SHARE Section -->
    <section id="share" class="horizontal-section">
      <div class="section-content">
        <div class="section-card" style="background: linear-gradient(135deg, var(--color-memory-purple) 0%, #7777DD 100%);">
          <h2 class="text-7xl md:text-8xl font-bold mb-8 opacity-0 animate-fade-in" style="animation-delay: 0.2s;">SHARE</h2>
          <p class="text-white/90 text-2xl md:text-3xl leading-relaxed opacity-0 animate-slide-in" style="animation-delay: 0.4s;">
            AI assisted tools that help you tell, reconstruct, and preserve your stories 
            in a way that actually captures how they felt.
          </p>
        </div>
      </div>
    </section>

    <!-- CONNECT Section -->
    <section id="connect" class="horizontal-section">
      <div class="section-content">
        <div class="section-card" style="background: linear-gradient(135deg, var(--color-memory-lavender) 0%, #A8A8FF 100%);">
          <h2 class="text-7xl md:text-8xl font-bold mb-8 opacity-0 animate-fade-in" style="animation-delay: 0.2s;">CONNECT</h2>
          <p class="text-white/90 text-2xl md:text-3xl leading-relaxed opacity-0 animate-slide-in" style="animation-delay: 0.4s;">
            Share and build memories with the people who matter in intimate circles and 
            co-authoring audiences.
          </p>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- In Development Notice -->
<section class="min-h-screen flex items-center justify-center px-6 py-20">
  <div class="max-w-4xl w-full text-center">
    <div class="inline-block px-6 py-2 mb-8 rounded-full" style="background-color: rgba(0, 102, 255, 0.2); border: 2px solid var(--color-memory-blue);">
      <span class="text-sm md:text-base font-semibold uppercase tracking-wider" style="color: var(--color-memory-blue);">
        In Active Development
      </span>
    </div>
    <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 opacity-0 animate-fade-in" style="color: var(--color-memory-blue); animation-delay: 0.2s;">
      We're Building Something Special
    </h2>
    <p class="text-xl md:text-2xl lg:text-3xl mb-8 opacity-0 animate-slide-in" style="color: rgba(255, 255, 255, 0.8); animation-delay: 0.4s;">
      Memoryscapes is currently in active development. We're crafting a platform that puts you in control of your memories and data.
    </p>
    <div class="launch-date-badge inline-flex items-center gap-3 mb-8 px-8 py-4 rounded-full opacity-0 animate-scale-in" style="background: linear-gradient(135deg, rgba(0, 102, 255, 0.15) 0%, rgba(153, 153, 255, 0.15) 100%); border: 2px solid var(--color-memory-blue); animation-delay: 0.5s;">
      <svg class="w-6 h-6" style="color: var(--color-memory-blue);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      <span class="text-xl md:text-2xl font-semibold" style="color: var(--color-memory-blue);">
        MVP Launch: May 2026
      </span>
    </div>
    <p class="text-lg md:text-xl opacity-0 animate-slide-in" style="color: rgba(255, 255, 255, 0.6); animation-delay: 0.7s;">
      Join our waitlist to be among the first to experience the future of memory preservation.
    </p>
  </div>
</section>

<!-- Footer Section with Email Signup -->
<section class="min-h-screen flex items-center justify-center px-6 py-20">
  <div class="max-w-2xl w-full text-center">
    <h2 class="text-5xl md:text-6xl font-bold mb-8 opacity-0 animate-fade-in" style="color: var(--color-memory-blue); animation-delay: 0.2s;">
      Stay Connected
    </h2>
    <p class="text-xl md:text-2xl mb-12 opacity-0 animate-slide-in" style="color: rgba(255, 255, 255, 0.7); animation-delay: 0.4s;">
      Join our community and be the first to know about updates.
    </p>
    <form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto opacity-0 animate-scale-in" style="animation-delay: 0.6s;">
      <input 
        type="email" 
        bind:value={email}
        placeholder="Enter your email" 
        disabled={isSubmitting}
        class="flex-1 px-6 py-4 rounded-full text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-memory-blue disabled:opacity-50"
        style="background-color: rgba(255, 255, 255, 0.1); border: 2px solid var(--color-memory-blue); color: white;"
      />
      <button 
        type="submit"
        disabled={isSubmitting}
        class="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style="background: linear-gradient(135deg, var(--color-memory-blue) 0%, #0052CC 100%); color: white;"
      >
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </button>
    </form>
    
    {#if submitMessage}
      <p class="mt-6 text-lg animate-fade-in" style="color: #4ade80;">
        ✓ {submitMessage}
      </p>
    {/if}
    
    {#if submitError}
      <p class="mt-6 text-lg animate-fade-in" style="color: #f87171;">
        ✗ {submitError}
      </p>
    {/if}
  </div>
</section>

