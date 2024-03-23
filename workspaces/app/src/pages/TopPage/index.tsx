// import _ from 'lodash';
// import moment from 'moment-timezone';
import React, { Suspense, lazy, useId, useState, useEffect } from 'react';

// const BookCard = lazy(() => import('../../features/book/components/BookCard'));
// const FeatureCard = lazy(() => import('../../features/feature/components/FeatureCard'));
// const RankingCard = lazy(() => import('../../features/ranking/components/RankingCard'));
const lazyWithDefault = (importFn: () => Promise<{ default: React.ComponentType<any> }>) => {
  return React.lazy(importFn);
};

const BookCard = lazyWithDefault(() => import('../../features/book/components/BookCard').then(module => ({ default: module.BookCard })));
const FeatureCard = lazyWithDefault(() => import('../../features/feature/components/FeatureCard').then(module => ({ default: module.FeatureCard })));
const RankingCard = lazyWithDefault(() => import('../../features/ranking/components/RankingCard').then(module => ({ default: module.RankingCard })));

// import { Suspense, useId } from 'react';

// import { BookCard } from '../../features/book/components/BookCard';
// import { FeatureCard } from '../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../features/feature/hooks/useFeatureList';
// import { RankingCard } from '../../features/ranking/components/RankingCard';
import { useRankingList } from '../../features/ranking/hooks/useRankingList';
import { useRelease } from '../../features/release/hooks/useRelease';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';

import { CoverSection } from './internal/CoverSection';

const TopPage: React.FC = () => {
  const { data: featureListData } = useFeatureList({ query: {} });
  const [featureList, setFeatureList] = useState(null);

  const { data: rankingListData } = useRankingList({ query: {} });
  const [rankingList, setRankingList] = useState(null);

  const todayStr = getDayOfWeekStr(new Date());
  const { data: releaseData } = useRelease({ params: { dayOfWeek: todayStr } });
  const [release, setRelease] = useState(null);

  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

  useEffect(() => {

    setFeatureList(featureListData);
    setRankingList(rankingListData);
    setRelease(releaseData);
    
  }, []);

  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />

      </Box>
      {/* featureListが取得できたらFeatureCardを描画 */}
      {featureList && (
      <Box as="main" maxWidth="100%" width="100%">
        <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
          <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
            ピックアップ
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
              {Array.isArray(featureList) && featureList.map(feature => (
                <FeatureCard key={feature.id} bookId={feature.book.id} />
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
      )}

      <Spacer height={Space * 2} />

      {/* rankingListが取得できたらRankingCardを描画 */}
      {rankingList && (
        <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
            ランキング
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
            <Flex align="center" as="ul" direction="column" justify="center">
              {Array.isArray(rankingList) && rankingList.map(ranking => (
                <RankingCard key={ranking.id} bookId={ranking.book.id} />
              ))}
            </Flex>
          </Box>
        </Box>
        )}

      <Spacer height={Space * 2} />
      {/* releaseが取得できたらFeatureCardを描画 */}
      {release && (

        <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
            本日更新
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Flex align="stretch" gap={Space * 2} justify="flex-start">
              {Array.isArray(release.books) && (release.books).map(book => (
                <BookCard key={book.id} bookId={book.id} />
              ))}
            </Flex>
          </Box>
        </Box>
        )}
    </Flex>
  );
};

const TopPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopPage />
    </Suspense>
  );
};

export { TopPageWithSuspense as TopPage };
