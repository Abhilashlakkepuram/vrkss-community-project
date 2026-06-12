import { useState, useEffect } from 'react'
import PageBanner from "../../components/PageBanner/PageBanner";



import AboutHero from '../../components/about/AboutHero'
import AboutContent from '../../components/about/AboutContent'
import HeritageFeatures from '../../components/about/HeritageFeatures'
import Statistics from '../../components/about/Statistics'
import CoreValues from '../../components/about/CoreValues'
import CommitteeMembers from '../../components/about/CommitteeMembers'

import { getAboutSamiti, 
    getPresidentMsg, 
    getHeritageFeatures, 
    getCoreValues, 
    getLeadershipMembers } from '../../services/aboutService'

import '../../styles/about.css'

const About = () => {

    const [about,setAbout] = useState(null)
    const [leaders,setLeaders] = useState([])
    const [features,setFeatures] = useState([])
    const [values,setValues] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [aboutRes, presidentRes, featureRes, valuesRes, leadersRes] = await Promise.allSettled([
                    getAboutSamiti(),
                    getPresidentMsg(),
                    getHeritageFeatures(),
                    getCoreValues(),
                    getLeadershipMembers(),
                ])

                if (aboutRes.status === 'fulfilled' && aboutRes.value.data?.success) {
                    setAbout(aboutRes.value.data.data || null)
                }

                if (presidentRes.status === 'fulfilled' && presidentRes.value.data?.success) {
                    setLeaders(presidentRes.value.data.data || [])
                }

                if (featureRes.status === 'fulfilled' && featureRes.value.data?.success) {
                    setFeatures(featureRes.value.data.data || [])
                }

                if (valuesRes.status === 'fulfilled' && valuesRes.value.data?.success) {
                    setValues(valuesRes.value.data.data || [])
                }

                if (leadersRes.status === 'fulfilled' && leadersRes.value.data?.success) {
                    setLeaders(leadersRes.value.data.data || [])
                }

            } catch (error) {

                console.log(error)

            }

        }

        fetchData()

    }, [])

    return (

        <div className="about-page">
            <PageBanner page="about-us" />
            {/* <AboutHero
                title="About Us"
                subtitle="Know More About Our Legacy, Values & Vision"
                image={about?.about_image}
            /> */}

            <AboutContent
                about={about}
            />

            <HeritageFeatures
                features={features}
            />

            <Statistics
                about={about}
            />

            <CoreValues
                values={values}
            />

            <CommitteeMembers
                leaders={leaders}
            />

        </div>

    )
}

export default About