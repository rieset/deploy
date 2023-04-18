{{/* vim: set filetype=mustache: */}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "chart.fullname" -}}
{{- $name := default .Values.nameOverride .Chart.Name -}}
{{- printf "%s-%s" .Release.Name $name | trimSuffix "-app" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Get a hostname from URL
*/}}
{{- define "chart.hostname" -}}
{{- . | trimPrefix "http://" |  trimPrefix "https://" | trimSuffix "/" | quote -}}
{{- end -}}

{{/*
Get a commit uniq string
*/}}
{{- define "chart.commit" -}}
{{- $rnd := randAlphaNum 4 -}}
{{- printf "%s-%s" .Values.commit $rnd | trunc 40 -}}
{{- end -}}
