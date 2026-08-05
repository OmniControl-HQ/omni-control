import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { GlassButton } from "../../src/components/ui/GlassButton";
import { Icon } from "../../src/components/ui/Icon";
import { colors, spacing, radii, typography } from "../../src/theme/tokens";
import { useKeyboardControl } from "../../src/hooks/useKeyboardControl";

type ShortcutButton = {
  id: string;
  label: string;
  icon: string;
  shortcut: "copy" | "paste" | "cut" | "selectAll" | "undo" | "redo" | "save" | "find" | "refresh" | "enter" | "backspace" | "delete" | "escape" | "tab" | "space";
};

const shortcuts: ShortcutButton[] = [
  { id: "1", label: "Copy", icon: "content-copy", shortcut: "copy" },
  { id: "2", label: "Paste", icon: "content-paste", shortcut: "paste" },
  { id: "3", label: "Cut", icon: "content-cut", shortcut: "cut" },
  { id: "4", label: "Select All", icon: "select-all", shortcut: "selectAll" },
  { id: "5", label: "Undo", icon: "undo", shortcut: "undo" },
  { id: "6", label: "Redo", icon: "redo", shortcut: "redo" },
  { id: "7", label: "Save", icon: "save", shortcut: "save" },
  { id: "8", label: "Find", icon: "search", shortcut: "find" },
  { id: "9", label: "Refresh", icon: "refresh", shortcut: "refresh" },
  { id: "10", label: "Enter", icon: "keyboard-return", shortcut: "enter" },
  { id: "11", label: "Backspace", icon: "backspace", shortcut: "backspace" },
  { id: "12", label: "Delete", icon: "delete", shortcut: "delete" },
  { id: "13", label: "Escape", icon: "cancel", shortcut: "escape" },
  { id: "14", label: "Tab", icon: "keyboard-tab", shortcut: "tab" },
  { id: "15", label: "Space", icon: "space-bar", shortcut: "space" },
];

export default function KeysScreen() {
  const [textInput, setTextInput] = useState("");
  const { sendText, sendShortcut, isConnected } = useKeyboardControl();

  const handleShortcutPress = async (shortcut: ShortcutButton["shortcut"]) => {
    if (!isConnected) return;
    await sendShortcut(shortcut);
  };

  const handleSendText = async () => {
    if (!isConnected || !textInput.trim()) return;
    const result = await sendText(textInput);
    if (result.ok) {
      setTextInput(""); // Clear input on success
    }
  };

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {!isConnected && (
          <View style={styles.disconnectedBanner}>
            <Icon name="error" size={18} color="#ef4444" />
            <Text style={styles.disconnectedText}>Not connected to PC</Text>
          </View>
        )}

        {/* Text Input Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Text Input</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type text to send to PC..."
              placeholderTextColor={colors.onSurfaceVariant}
              value={textInput}
              onChangeText={setTextInput}
              multiline
              editable={isConnected}
              maxLength={5000}
            />
            <Pressable
              style={[styles.sendButton, !isConnected && styles.sendButtonDisabled]}
              onPress={handleSendText}
              disabled={!isConnected || !textInput.trim()}
            >
              <Icon name="send" size={24} color={colors.primary} />
            </Pressable>
          </View>
          <Text style={styles.charCount}>{textInput.length} / 5000</Text>
        </View>

        {/* Keyboard Shortcuts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Keyboard Shortcuts</Text>
          <View style={styles.shortcutsGrid}>
            {shortcuts.map((shortcut) => (
              <GlassButton
                key={shortcut.id}
                style={[
                  styles.shortcutButton,
                  !isConnected && styles.shortcutButtonDisabled,
                ]}
                onPress={() => handleShortcutPress(shortcut.shortcut)}
                disabled={!isConnected}
              >
                <Icon
                  name={shortcut.icon as any}
                  size={20}
                  color={isConnected ? colors.primary : colors.onSurfaceVariant}
                />
                <Text style={[
                  styles.shortcutLabel,
                  !isConnected && styles.shortcutLabelDisabled,
                ]}>
                  {shortcut.label}
                </Text>
              </GlassButton>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 80,
    paddingBottom: 120,
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.stackGap * 2,
  },
  disconnectedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: radii.md,
  },
  disconnectedText: {
    ...typography.labelMd,
    color: "#ef4444",
  },
  section: {
    gap: spacing.stackGap,
  },
  sectionLabel: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  textInputContainer: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderLeftColor: "rgba(255, 255, 255, 0.08)",
    padding: spacing.stackGap,
    minHeight: 120,
    flexDirection: "row",
    gap: spacing.gridGutter,
  },
  textInput: {
    flex: 1,
    ...typography.labelMd,
    color: colors.onSurface,
    textAlignVertical: "top",
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sendButtonDisabled: {
    opacity: 0.3,
  },
  charCount: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textAlign: "right",
  },
  shortcutsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.gridGutter,
  },
  shortcutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 100,
  },
  shortcutButtonDisabled: {
    opacity: 0.3,
  },
  shortcutLabel: {
    ...typography.labelMd,
    color: colors.primary,
    fontFamily: "Inter_600SemiBold",
  },
  shortcutLabelDisabled: {
    color: colors.onSurfaceVariant,
  },
});
