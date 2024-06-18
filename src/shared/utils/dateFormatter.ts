function formatDate(dateString: string): string {

  if (dateString === '') {
    return ''
  }

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export default formatDate