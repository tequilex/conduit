import styles from './styles.module.scss';

interface TabsProps {
  activeKey: string;
  items: { key: string; name: string }[];
  handleTabs: (key: string) => void;
  onChange: (key: string) => void;
}

export function Tabs({ items, activeKey, onChange, handleTabs }: TabsProps) {
  const handleTabClick = (key: string) => {
    onChange(key);
    handleTabs(key);
  };

  return (
    <div className={styles.tabs}>
      {items.map((tab) => (
        <div
          onClick={() => handleTabClick(tab.key)}
          key={tab.key}
          className={`${styles.tab} ${tab.key === activeKey ? styles.activeTab : ''}`}>
          {tab.name}
        </div>
      ))}
    </div>
  );
}
