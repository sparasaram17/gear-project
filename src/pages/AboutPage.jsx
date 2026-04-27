import PageLayout from '../components/PageLayout'

export default function AboutPage() {
  return (
    <PageLayout
      title="About This Tool"
      titleId="about-page-heading"
      subtitle="Mechanical Gear Simulator and Calculator"
    >
      <p className="about-lead">
        A web-based educational tool for introductory engineering courses. CS571 Web Project 10.
      </p>
      <div className="about-body">
        <p>
          This simulator helps you explore gear ratio, speed ratio, and torque relationships. Enter the number of teeth on driving and driven gears to compute values instantly, and watch the visualizer animate meshing gears so you can see how tooth count affects rotation speed and direction.
        </p>
        <p>
          Use the <strong>Simulator</strong> to run calculations and view the live gear animation, and <strong>Terminology</strong> for definitions and how the values apply to gear system design.
        </p>
        <p className="mb-0">
          View the project source on{' '}
          <a
            href="https://github.com/sparasaram17/gear-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </PageLayout>
  )
}
