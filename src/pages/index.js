import React from "react"
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import { motion } from 'framer-motion'

const duration = 0.35

const container = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      delayChildren: duration,
    },
  },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const IndexPage = ({data}) => {

  const main = data.prismicHomepage.data
  const slices = data.allPrismicHomepageBodySection.edges

  return (
    <div>

      <SEO title="Home" />

      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
        className="container"
      >
        <motion.div 
          className="content"
          variants={item}
          transition="easeInOut"
        >
          <div className="text-lg md:text-xl pl-3 border-l-2 border-black">{main.intro_text.html}</div>
        </motion.div>

        <motion.div 
          className="content"
          variants={item}
          transition="easeInOut"
        >
          <hr className="block my-8" />
        </motion.div>

        <motion.div 
          className="content"
          variants={item}
          transition="easeInOut"
        >

        {
          slices.map(slicesData => (
            <div>
            <h2>{slicesData.node.primary.section_title.text}</h2>

                {
                  slicesData.node.items.map(itemsData => (
                    <div>
                    {itemsData.title.text}
                    </div>
                  ))
                }

            </div>
          ))
        }

        </motion.div>
      </motion.section>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
query MyQuery {
  allPrismicHomepageBodySection {
    edges {
      node {
        primary {
          section_title {
            html
            text
          }
        }
        id
        items {
          title {
            text
          }
          telephone
          website {
            url
          }
          text {
            html
          }
        }
      }
    }
  }
  prismicHomepage {
    data {
      title {
        text
      }
      intro_text {
        html
      }
    }
  }
}


`