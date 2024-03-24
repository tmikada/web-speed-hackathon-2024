import { useSetAtom } from 'jotai';
import React, { useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
// import { COMPANY } from '../constants/Company';
// import { CONTACT } from '../constants/Contact';
// import { OVERVIEW } from '../constants/Overview';
// import { QUESTION } from '../constants/Question';
// import { TERM } from '../constants/Term';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

// APIから利用規約のデータを取得する関数
const fetchTermsOfService = async (id) => {
  const response = await fetch('/api/v1/terms/'+id);
  if (!response.ok) {
    throw new Error('Failed to fetch terms of service');
  }
  const data = await response.json();
  return data.terms;
};


export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);
  const [termsOfService, setTermsOfService] = React.useState('');
  const [contactData, setContact] = React.useState('');
  const [questionData, setQuestion] = React.useState('');
  const [companyData, setCompany] = React.useState('');
  const [overviewData, setOverview] = React.useState('');

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // 利用規約のデータをAPIから取得する
  const loadTermsOfService = async () => {
    try {
      const terms = await fetchTermsOfService(1);
      setTermsOfService(terms);
    } catch (error) {
      console.error('Failed to load terms of service:', error);
    }
  };
  const loadContact = async () => {
    try {
      const terms = await fetchTermsOfService(2);
      setContact(terms);
    } catch (error) {
      console.error('Failed to load terms of service:', error);
    }
  };
  const loadQuestion = async () => {
    try {
      const terms = await fetchTermsOfService(3);
      setQuestion(terms);
    } catch (error) {
      console.error('Failed to load terms of service:', error);
    }
  };
  const loadCompany = async () => {
    try {
      const terms = await fetchTermsOfService(4);
      setCompany(terms);
    } catch (error) {
      console.error('Failed to load terms of service:', error);
    }
  };
  const loadOverview = async () => {
    try {
      const terms = await fetchTermsOfService(5);
      setOverview(terms);
    } catch (error) {
      console.error('Failed to load terms of service:', error);
    }
  };

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  React.useEffect(() => {
    if (termsOfService) {
      updateDialogContent(
        <_Content aria-labelledby={termDialogA11yId} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
            利用規約
          </Text>
          <Spacer height={Space * 1} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {termsOfService}
          </Text>
        </_Content>,
      );
    }
  }, [termsOfService, updateDialogContent, termDialogA11yId]);

  React.useEffect(() => {
    if (contactData) {
      updateDialogContent(
        <_Content aria-labelledby={contactDialogA11yId} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
            お問い合わせ
          </Text>
          <Spacer height={Space * 1} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {contactData}
          </Text>
        </_Content>,
      );
    }
  }, [contactData, updateDialogContent, termDialogA11yId]);

  React.useEffect(() => {
    if (questionData) {
      updateDialogContent(
        <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {questionData}
        </Text>
      </_Content>,
      );
    }
  }, [questionData, updateDialogContent, termDialogA11yId]);

  React.useEffect(() => {
    if (companyData) {
      updateDialogContent(
        <_Content aria-labelledby={companyDialogA11yId} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
            運営会社
          </Text>
          <Spacer height={Space * 1} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {companyData}
          </Text>
        </_Content>,
      );
    }
  }, [companyData, updateDialogContent, termDialogA11yId]);

  React.useEffect(() => {
    if (overviewData) {
      updateDialogContent(
        <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
            Cyber TOONとは
          </Text>
          <Spacer height={Space * 1} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {overviewData}
          </Text>
        </_Content>,
      );
    }
  }, [overviewData, updateDialogContent, termDialogA11yId]);

  const handleRequestToTermDialogOpen = () => {
    loadTermsOfService();
  };

  const handleRequestToContactDialogOpen = () => {
    loadContact();
  };

  const handleRequestToQuestionDialogOpen = () => {
    loadQuestion();
  };

  const handleRequestToCompanyDialogOpen = () => {
    loadCompany();
  };

  const handleRequestToOverviewDialogOpen = () => {
    loadOverview();
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" loading="lazy"/>
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
