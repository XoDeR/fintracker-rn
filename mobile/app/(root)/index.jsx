import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions';
import { useEffect } from 'react';
import PageLoader from '../../components/PageLoader';
import { styles } from '../../assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { BalanceCard } from '../../components/BalanceCard';

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions(user.id);

  console.log("userId", user.id);
  console.log("transactions", transactions);
  console.log("summary", summary);

  useEffect(() => {
    loadData()
  }, [loadData]);

  if (isLoading) return <PageLoader />

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/* RIGHT */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        {/* BALANCE CARD */}
        <BalanceCard summary={summary} />
        {/* RECENT TRANSACTIONS */}
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      {/* TRANSACTIONS LIST */}
      {/* FlatList renders items lazily -- only those that are on the screen */}
      <FlatList
        style={styles.transactionsList}
        contentConteinerStyle={styles.transactionsListContent}
        data={transactions}
      />

      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text>Income: {summary.income}</Text>
        <Text>Balance: {summary.balance}</Text>
        <Text>Expenses: {summary.expenses}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}