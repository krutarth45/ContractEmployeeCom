import { Col, Container, Row } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import './index.css';
const PrivacyPolicy = () => {
  const data = [
    {
      category: 'Essential Cookies',
      description:
        'Essential cookies (First Party Cookies) are sometimes called strictly necessary as without them we cannot provide many services that you need on the Website. For example, essential cookies help remember your preferences as you move around the Website. Essential cookies also keep you logged in into a website. Without them the login functionality would not work.',
      key: 1
    },
    {
      category: 'Analytics Cookies',
      description: `These cookies track information about visits to the Contractemploy.com and partner (recruiter websites) websites so that we can make improvements and report our performance. For example: analyse visitor and user behaviour so as to provide more relevant content or suggest certain activities. They collect information about how visitors use the Websites, which site the user came from, the number of each users visits and how long a user stays on the Websites. We might also use analytics cookies to test new ads, pages, or features to see how users react to them. During your visit to the Websites, cookies are used to remember information you have entered or choices you make (such as your username, language or your region) on the Websites. They also store your preferences when personalizing the Websites to optimize your use of Contractemploy.com. These preferences are remembered, through the use of the persistent cookies, and the next time you visit the Websites you will not have to set them again.`,
      key: 2
    },
    {
      category: 'Functionality or Preference Cookies',
      description:
        'These Cookies are placed by third party advertising platforms or networks or Contractemploy.com in order to, deliver ads and track ad performance, enable advertising networks to deliver ads that may be relevant to you based upon your activities (this is sometimes called "behavioural" "tracking" or "targeted" advertising) on the Websites.',
      key: 3
    },
    {
      category: 'Targeting or Advertising Cookies',
      description:
        'They may subsequently use information about your visit to target you with advertising that you may be interested in, on Contractemploy.com websites or other websites. For example, these cookies remember which browsers have visited the websites.',
      key: 4
    }
  ];
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'key'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'key'
    }
  ];

  return (
    <Container className="homeSubPages">
      <Row className="text-center my-5">
        <Col md={12}>
          <h2
            style={{
              textDecoration: 'underline',
              fontWeight: 'bold',
              color: '#a9a9a9'
            }}
          >
            Privacy Policy
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h5 className="fw-bold" style={{ color: 'grey' }}>
            1. Introduction
          </h5>
        </Col>
        <Col md={12}>
          <p className="fw-bold" style={{ fontSize: '16px' }}>
            We, at Dharmaworks (India) Pvt. Ltd.and our affiliated companies
            worldwide (hereinafter collectively referred to as "DHARMAWORKS"),
            are committed to respecting your online privacy and recognize the
            need for appropriate protection and management of any personally
            identifiable information you share with us. This Privacy Policy
            ("Policy") describes how DHARMAWORKS collects, uses, discloses and
            transfers personal information of users through its websites and
            applications, including through Contractemploy.com, mobile
            applications and online services (collectively, the "Platform").
            This policy applies to those who visit the Platform, or whose
            information DHARMAWORKS otherwise receives in connection with its
            services (such as contact information of individuals associated with
            DHARMAWORKS including partners) (hereinafter collectively referred
            to as "Users"). For the purposes of the Privacy Policy, "You" or
            "Your" shall mean the person who is accessing the Platform.
          </p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <h5 className="fw-bold" style={{ color: 'grey' }}>
            2. Cookies
          </h5>
        </Col>
        <Col md={12}>
          <p className="fw-bold" style={{ fontSize: '16px' }}>
            When you visit our Websites, we may place a number of cookies in
            your browser. These are known as First Party Cookies and are
            required to enable to hold session information as you navigate from
            page to page within the website. For example, we use cookies on our
            Websites to understand visitor and user preferences, improve their
            experience, and track and analyse usage, navigational and other
            statistical information. Additionally, cookies allow us to bring you
            advertising both on and off the Contractemploy.com site, and bring
            customized features to you. You can control the use of cookies at
            the individual browser level. If you elect not to activate the
            cookie or to later disable cookies, you may still visit our
            Websites, but your ability to use some features or areas of the
            Websites may be limited. We may use any of the following categories
            of cookies on the Websites as detailed below. Each cookie falls
            within one of the four following categories:
          </p>
        </Col>
        <Col className="mb-5" md={12}>
          <Table dataSource={data} columns={columns} pagination={false} />
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
