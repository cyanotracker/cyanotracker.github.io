import Footer from '../components/Footer';
import PublicationCard from '../components/PublicationCard';

const Publications =() => {
    return (
        <div>
            
            <div style={{ marginTop: '90px'}}></div>
            <PublicationCard title="Continuous and synoptic assessment of Indian inland waters for harmful algae blooms." authors="Maniyar, Chintan B., Abhishek Kumar, and Deepak R. Mishra" journal="Harmful Algae" year="2022" volume="111" link="https://doi.org/10.1016/j.hal.2021.102160"></PublicationCard>
            <PublicationCard title="CyanoTRACKER: A cloud-based integrated multi-platform architecture for global observation of cyanobacterial harmful algal blooms" authors="Mishra, Deepak R., et al. " journal="Harmful algae" year="2020" volume="96"  link="https://doi.org/10.1016/j.hal.2020.101828"></PublicationCard>
            <PublicationCard title="Landsat 8 virtual orange band for mapping cyanobacterial blooms." authors="Kumar, Abhishek, Deepak R. Mishra, and Nirav Ilango. " journal="Remote Sensing" year="2020" volume="12.5" link="https://doi.org/10.3390/rs12050868"></PublicationCard>
            <PublicationCard title="A multi-cloud cyber infrastructure for monitoring global proliferation of cyanobacterial harmful algal blooms" authors="Mishra, Deepak, et al." journal="IGARSS, 2018-2018 IEEE International Geoscience and Remote Sensing Symposium. IEEE" year="2018" link="https://doi.org/10.1109/IGARSS.2018.8519144"></PublicationCard>
            <PublicationCard title="A novel cross-satellite based assessment of the spatio-temporal development of a cyanobacterial harmful algal bloom." authors="Page, Benjamin P., Abhishek Kumar, and Deepak R. Mishra" journal="International journal of applied earth observation and geoinformation 66" year="2018" volume="66" link="https://doi.org/10.1016/j.jag.2017.11.003"></PublicationCard>
            <PublicationCard title="CyanoSense: a wireless remote sensor system using raspberry-pi and arduino with application to algal bloom." authors="Boddula, Vinay, Lakshmish Ramaswamy, and Deepak Mishra" journal="2017 IEEE International Conference on AI & Mobile Services (AIMS). IEEE" year="2017" link="https://doi.org/10.1109/AIMS.2017.19"></PublicationCard>
            <PublicationCard title="A spatio-temporal mining approach for enhancing satellite data availability: a case study on blue green algae." authors="Boddula, Vinay, Lakshmish Ramaswamy, and Deepak Mishra" journal="2017 IEEE International Congress on Big Data (BigData Congress). IEEE" year="2017" link=" https://doi.org/10.1109/BigDataCongress.2017.37"></PublicationCard>
           
          
            <PublicationCard title="Data driven analysis of Algal Bloom activity for effective Water Sustainability." authors="Boddula, Vinay, et al." journal="2016 IEEE International Conferences on Big Data and Cloud Computing (BDCloud), Social Computing and Networking (SocialCom), Sustainable Computing and Communications (SustainCom)(BDCloud-SocialCom-SustainCom). IEEE" year="2016" link=" https://doi.org/10.1109/BDCloud-SocialCom-SustainCom.2016.69"></PublicationCard>
            <PublicationCard title="Harnessing social media for environmental sustainability: a measurement study on harmful algal blooms." authors="Boddula, Vinay, et al." journal="2015 IEEE Conference on Collaboration and Internet Computing (CIC). IEEE" year="2015" link="https://doi.org/10.1109/CIC.2015.31"></PublicationCard>
            

            
            
        </div>
    );
}

export default Publications;