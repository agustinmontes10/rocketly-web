import '../styles/components/projects.scss';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory and seamless checkout.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    tags: ['Next.js', 'TypeScript', 'Stripe']
  },
  {
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard for SaaS businesses with real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    tags: ['React', 'D3.js', 'Node.js']
  },
  {
    title: 'Social Platform',
    description: 'Community platform with real-time messaging and content sharing.',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    tags: ['Next.js', 'WebSocket', 'PostgreSQL']
  }
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="heading heading--lg">Our Latest Projects</h2>
        <div className="projects__grid">
          {projects.map((project, index) => (
            <div key={index} className="projects__card">
              <img
                src={project.image}
                alt={project.title}
                className="projects__card-image"
              />
              <div className="projects__card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="projects__card-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stars">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>
    </section>
  );
}