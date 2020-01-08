/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

// AUTOGENERATED. DO NOT EDIT.
// clang-format off

goog.provide('{{ .PackageName }}');
goog.setTestOnly('{{ .PackageName }}');

{{- define "element" -}}
  {input: '{{ .GetInput | js }}', expected: {{ if .GetInnocuous -}}
      'about:invalid#zClosurez', safe: false
    {{- else -}}
      '{{ .GetOutput | js }}', safe: true
    {{- end -}}
  }
{{- end }}

{{ .PackageName }}.BASE_VECTORS = [
  {{- range $i, $e := .TestVectors -}}
    {{- if eq 0 (len .CustomUrlScheme) -}}
      {{- if ne $i 0 -}} , {{- end }}
      {{ template "element" $e -}}
    {{- end -}}
  {{- end }}
];

{{ .PackageName }}.TEL_VECTORS = [
  {{- range $i, $e := .TestVectors | filterTel -}}
    {{- if ne $i 0 -}} , {{- end }}
    {{ template "element" $e -}}
  {{- end }}
];

{{ .PackageName }}.SMS_VECTORS = [
  {{- range $i, $e := .TestVectors | filterSms -}}
    {{- if ne $i 0 -}} , {{- end }}
    {{ template "element" $e -}}
  {{- end }}
];

{{ .PackageName }}.SSH_VECTORS = [
  {{- range $i, $e := .TestVectors | filterSsh -}}
    {{- if ne $i 0 -}} , {{- end }}
    {{ template "element" $e -}}
  {{- end }}
];
